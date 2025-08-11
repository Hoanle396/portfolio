import { NextRequest } from 'next/server';
import { projects } from '../../../data/projects';
import { experience } from '../../../data/experience';
import { education } from '../../../data/education';
import { skills } from '../../../data/skills';
import { siteConfig } from '../../../config/site';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function buildContextSummary() {
  const proj = projects
    .map(
      (p) =>
        `Title: ${p.title}\nDescription: ${p.description}\nTech: ${p.tech.join(', ')}` +
        (p.href ? `\nLink: ${p.href}` : ''),
    )
    .join('\n---\n');
  const exp = experience
    .map(
      (e) =>
        `Company: ${e.company}\nRole: ${e.role}\nPeriod: ${e.period}\nHighlights: ${e.achievements.join(' | ')}`,
    )
    .join('\n---\n');
  const edu = education
    .map(
      (e) => `School: ${e.school}\nDegree: ${e.degree}\nDetails: ${(e.details || []).join(' | ')}`,
    )
    .join('\n');
  const skillStr = skills.map((g) => `${g.category}: ${g.skills.join(', ')}`).join(' | ');
  return (
    `You are an AI assistant embedded in the personal portfolio site for ${siteConfig.name}.\n` +
    `Site Description: ${siteConfig.description}\n` +
    `Primary contact email: ${siteConfig.links.email}.\n` +
    `Answer concisely, professionally, and ONLY about Hoan Le's background, experience, projects, skills, education, and how to get in touch. ` +
    `If asked unrelated questions, politely redirect to relevant topics.\n` +
    `Projects:\n${proj}\n\nExperience:\n${exp}\n\nEducation:\n${edu}\n\nSkills:\n${skillStr}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages: ChatMessage[] = body?.messages || [];
    const requestedProvider: string | undefined = body?.provider; // optional override from client

    const openaiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // Provider resolution priority: explicit body.provider -> Gemini (if key) -> OpenAI (if key) -> fallback
    let provider: 'gemini' | 'openai' | 'fallback';
    if (requestedProvider === 'gemini' && geminiKey) provider = 'gemini';
    else if (requestedProvider === 'openai' && openaiKey) provider = 'openai';
    else if (geminiKey) provider = 'gemini';
    else if (openaiKey) provider = 'openai';
    else provider = 'fallback';

    if (provider === 'fallback') {
      const lastUser = [...messages].reverse().find((m) => m.role === 'user');
      const fallback =
        'Chat AI (fallback): Configure GEMINI_API_KEY or OPENAI_API_KEY in .env.local for full answers. ' +
        'Summary: Hoan Le is a full-stack engineer (Node.js, NestJS, Next.js, Go, Solidity, Kubernetes). Ask about projects, experience, skills, or contact.' +
        (lastUser ? ` You asked: "${lastUser.content}"` : '');
      return new Response(JSON.stringify({ reply: fallback, fallback: true, provider }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = buildContextSummary();
    const recent = messages.slice(-10);

    if (provider === 'openai') {
      const openAiMessages = [
        { role: 'system', content: systemPrompt },
        ...recent.map((m) => ({ role: m.role, content: m.content })),
      ];
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: openAiMessages,
          temperature: 0.3,
        }),
      });
      if (!openAiRes.ok) {
        const errorText = await openAiRes.text();
        return new Response(
          JSON.stringify({ error: 'OpenAI upstream error', details: errorText, provider }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }
      const data = await openAiRes.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || 'No response generated.';
      return new Response(JSON.stringify({ reply, provider, model: 'gpt-3.5-turbo' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Gemini provider path
    // Gemini does not support a system role the same way; include systemPrompt as an initial user instruction
    const geminiModel = body?.model || 'gemini-1.5-flash';
    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;
    const geminiContents = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      ...recent
        .filter((m) => m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
    ];

    const geminiRes = await fetch(geminiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiContents, generationConfig: { temperature: 0.3 } }),
    });
    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: 'Gemini upstream error', details: errorText, provider }),
        { status: 500, headers: { 'Content-Type': 'application/json' } },
      );
    }
    const geminiData = await geminiRes.json();
    const reply =
      geminiData?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text)
        .join('\n')
        .trim() || 'No response generated.';
    return new Response(JSON.stringify({ reply, provider, model: geminiModel }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const runtime = 'nodejs';
