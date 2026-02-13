'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { Send } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  fallback?: boolean;
}

const markdownComponents: Components = {
  code(codeProps) {
    const { inline, className, children, ...rest } = codeProps as any;
    const lang = /language-(\w+)/.exec(className || '')?.[1];
    if (inline) {
      return (
        <code
          className="rounded bg-zinc-200 px-1 py-0.5 text-[11px] dark:bg-zinc-700"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return (
      <pre
        className="mt-2 max-h-52 overflow-auto rounded-md bg-zinc-900 p-3 text-[11px] text-white dark:bg-zinc-800"
        data-lang={lang}
        {...rest}
      >
        <code>{children}</code>
      </pre>
    );
  },
  a({ children, href, ...props }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-brand-400"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul({ children, ...props }) {
    return (
      <ul className="mb-2 ml-4 list-disc space-y-1" {...props}>
        {children}
      </ul>
    );
  },
  ol({ children, ...props }) {
    return (
      <ol className="mb-2 ml-4 list-decimal space-y-1" {...props}>
        {children}
      </ol>
    );
  },
  strong({ children, ...props }) {
    return (
      <strong className="font-semibold text-zinc-900 dark:text-white" {...props}>
        {children}
      </strong>
    );
  },
  p({ children, ...props }) {
    return (
      <p className="mb-2 last:mb-0" {...props}>
        {children}
      </p>
    );
  },
};

function TypingIndicator() {
  return (
    <div className="mr-auto flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
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
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 680) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    const timeout = setTimeout(handleResize, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const submit = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
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
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: data.reply, fallback: data.fallback },
        ]);
      } else if (data.error) {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: `Error: ${data.error}. Try again later.` },
        ]);
      }
    } catch (e: any) {
      setMessages((m) => [
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
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <span className="relative z-10 font-semibold tracking-wide select-none">
          {open ? '✕' : 'AI'}
        </span>
        {!open && (
          <span className="pointer-events-none absolute inset-0">
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-sm transition-opacity group-hover:opacity-40" />
            <span className="absolute top-1 right-1 text-[9px] text-yellow-300 drop-shadow animate-pulse">
              ★
            </span>
            <span className="absolute bottom-1 left-1 text-[10px] text-amber-200 animate-[ping_2s_ease-in-out_infinite]">
              ★
            </span>
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[7px] text-yellow-200 animate-pulse [animation-delay:300ms]">
              ★
            </span>
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-5 z-50 flex w-80 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white/95 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/95"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2 text-xs font-medium tracking-wide text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <span>AI Assistant</span>
              <button
                onClick={() => setMessages((m) => m.slice(0, 1))}
                className="rounded px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-400 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Reset
              </button>
            </div>
            <div
              ref={listRef}
              className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3 text-sm"
            >
              {messages.map((m, i) => {
                const baseUser =
                  'ml-auto max-w-[85%] rounded-lg bg-brand-500 px-3 py-2 text-white shadow text-xs whitespace-pre-wrap';
                const baseAssistant =
                  'mr-auto max-w-[90%] rounded-lg bg-zinc-100 px-3 py-2 text-[13px] leading-relaxed text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200';
                return (
                  <div key={i} className={m.role === 'user' ? baseUser : baseAssistant}>
                    {m.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
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
              className="border-t border-zinc-100 p-2 dark:border-zinc-800"
            >
              <div className="flex items-end gap-2">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Ask about Hoan..."
                  className="max-h-24 flex-1 resize-none rounded-md border border-zinc-200 bg-white px-2 py-2 text-xs text-zinc-700 outline-none ring-brand-400 focus:ring dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="rounded-md bg-brand-500 px-3 py-2 text-xs font-medium text-white shadow transition hover:bg-brand-600 disabled:opacity-40"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
