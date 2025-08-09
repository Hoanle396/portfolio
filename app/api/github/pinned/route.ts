import { NextResponse } from 'next/server';

const PINNED = [
  'hoanle396'
];

export async function GET() {
  try {
    const username = 'hoanle396';
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { 'User-Agent': 'portfolio', Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('GitHub fetch failed');
    const data = await res.json();
    const filtered = data
      .filter((r: any) => !r.fork)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6)
      .map((r: any) => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        url: r.html_url,
        language: r.language
      }));
    return NextResponse.json(filtered);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 });
  }
}
