'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  fallback?: boolean;
}

function TypingIndicator() {
  return (
    <div className="mr-auto flex items-center gap-2 rounded-lg bg-neutral-900/5 px-3 py-2 text-xs text-neutral-500 dark:bg-white/5 dark:text-white/50">
      <span>Thinking</span>
      <span className="inline-flex gap-1">
        <span className="h-1 w-1 animate-bounce rounded-full bg-brand-500 [animation-delay:0ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-brand-500 [animation-delay:120ms]" />
        <span className="h-1 w-1 animate-bounce rounded-full bg-brand-500 [animation-delay:240ms]" />
      </span>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm the embedded AI assistant. Ask me about Hoan Le's projects, experience, skills, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const submit = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((m: ChatMessage[]) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((m: ChatMessage[]) => [
          ...m,
          { role: 'assistant', content: data.reply, fallback: data.fallback },
        ]);
      } else if (data.error) {
        setMessages((m: ChatMessage[]) => [
          ...m,
          { role: 'assistant', content: `Error: ${data.error}. Try again later.` },
        ]);
      }
    } catch (e: any) {
      setMessages((m: ChatMessage[]) => [
        ...m,
        { role: 'assistant', content: `Network error: ${e?.message || 'Unknown error'}` },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o: boolean) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-brand-500/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        {open ? '✕' : 'AI'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-xl border border-neutral-900/10 bg-white/90 backdrop-blur-lg dark:border-white/10 dark:bg-neutral-900/90"
          >
            <div className="flex items-center justify-between border-b border-neutral-900/5 px-4 py-2 text-xs font-medium tracking-wide text-neutral-500 dark:border-white/5 dark:text-white/50">
              <span>AI Assistant</span>
              <button
                onClick={() => setMessages((m: ChatMessage[]) => m.slice(0, 1))}
                className="rounded px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400 transition hover:bg-neutral-900/5 dark:hover:bg-white/5"
              >
                Reset
              </button>
            </div>
            <div
              ref={listRef}
              className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm"
            >
              {messages.map((m: ChatMessage, i: number) => {
                const baseUser =
                  'ml-auto max-w-[85%] rounded-lg bg-gradient-to-br from-brand-500/90 to-fuchsia-500/90 px-3 py-2 text-white shadow text-xs whitespace-pre-wrap';
                const baseAssistant =
                  'mr-auto max-w-[90%] rounded-lg bg-neutral-900/5 px-3 py-2 text-[13px] leading-relaxed text-neutral-700 dark:bg-white/5 dark:text-white/80';
                return (
                  <div key={i} className={m.role === 'user' ? baseUser : baseAssistant}>
                    {m.role === 'assistant' ? (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({
                            inline,
                            className,
                            children,
                            ...props
                          }: {
                            inline?: boolean;
                            className?: string;
                            children: React.ReactNode;
                          }) {
                            const lang = /language-(\w+)/.exec(className || '')?.[1];
                            return inline ? (
                              <code
                                className="rounded bg-neutral-900/10 px-1 py-0.5 text-[11px] dark:bg-white/10"
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre
                                className="mt-2 max-h-52 overflow-auto rounded-md bg-neutral-900/90 p-3 text-[11px] text-white dark:bg-neutral-800"
                                data-lang={lang}
                              >
                                <code>{children}</code>
                              </pre>
                            );
                          },
                          a({ children, href }: { children: React.ReactNode; href?: string }) {
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-dotted underline-offset-2 hover:text-brand-500"
                              >
                                {children}
                              </a>
                            );
                          },
                          ul({ children }: { children: React.ReactNode }) {
                            return <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>;
                          },
                          ol({ children }: { children: React.ReactNode }) {
                            return <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>;
                          },
                          strong({ children }: { children: React.ReactNode }) {
                            return (
                              <strong className="font-semibold text-neutral-900 dark:text-white">
                                {children}
                              </strong>
                            );
                          },
                          p({ children }: { children: React.ReactNode }) {
                            return <p className="mb-2 last:mb-0">{children}</p>;
                          },
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    ) : (
                      m.content
                    )}
                  </div>
                );
              })}
              {loading && <TypingIndicator />}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="border-t border-neutral-900/10 p-2 dark:border-white/10"
            >
              <div className="flex items-end gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask about Hoan..."
                  className="max-h-24 flex-1 resize-none rounded-md border border-neutral-900/10 bg-white/80 px-2 py-2 text-xs text-neutral-700 outline-none ring-brand-400 focus:ring dark:border-white/10 dark:bg-neutral-800/60 dark:text-white/80"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-md bg-gradient-to-r from-brand-500 to-indigo-500 px-3 py-2 text-xs font-medium text-white shadow disabled:opacity-40"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
