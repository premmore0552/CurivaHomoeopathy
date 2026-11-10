import React, { useMemo } from 'react';

type Props = {
  html: string;
  className?: string;
};

const allowedTags: Record<string, string> = {
  p: 'mb-4 leading-relaxed',
  div: 'my-3',
  span: '',
  strong: 'font-bold',
  b: 'font-bold',
  em: 'italic',
  i: 'italic',
  u: 'underline',
  br: '',
  hr: 'my-6 border-border',
  h1: 'mt-6 mb-3 text-2xl font-bold',
  h2: 'mt-6 mb-3 text-xl font-bold',
  h3: 'mt-5 mb-2 text-lg font-bold',
  h4: 'mt-4 mb-2 text-base font-bold',
  ul: 'my-4 list-disc space-y-2 pl-6',
  ol: 'my-4 list-decimal space-y-2 pl-6',
  li: 'pl-1 leading-relaxed',
  blockquote: 'my-5 border-l-4 border-primary/40 pl-4 italic',
  pre: 'my-4 overflow-x-auto rounded-xl bg-black/5 p-4 text-sm',
  code: 'rounded bg-black/5 px-1 py-0.5 font-mono text-[0.9em]',
  table: 'my-4 w-full border-collapse text-left text-sm',
  thead: 'border-b border-border',
  tbody: '',
  tr: 'border-b border-border/60',
  th: 'px-3 py-2 text-left font-bold',
  td: 'px-3 py-2 align-top'
};

const forbiddenTags = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'svg', 'math',
  'form', 'input', 'button', 'textarea', 'select', 'option',
  'template', 'noscript', 'meta', 'link', 'base'
]);

function safeHref(value: string | null): string | null {
  if (!value) return null;
  const href = value.trim();
  if (/^https:\/\//i.test(href)) return href;
  if (/^\/(?!\/)/.test(href) && !/[\u0000-\u001f]/.test(href)) return href;
  return null;
}

const AUTO_LINK_TOKEN_REGEX = /\[\[AUTO_LINK\|([^|\]]+)\|([^|\]]+)\|([\s\S]*?)\]\]/g;

function renderAutoLinkTokens(input: string): React.ReactNode[] | null {
  if (!input.includes('[[AUTO_LINK|')) return null;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIndex = 0;

  while ((match = AUTO_LINK_TOKEN_REGEX.exec(input)) !== null) {
    const [fullMatch, rawPath, rawTitle, rawText] = match;
    if (match.index > lastIndex) {
      nodes.push(input.slice(lastIndex, match.index));
    }

    const href = safeHref(rawPath);
    if (!href) {
      nodes.push(rawText);
    } else {
      const external = /^https:\/\//i.test(href);
      nodes.push(
        <a
          key={`auto-link-${tokenIndex}`}
          href={href}
          title={rawTitle}
          className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/5 hover:bg-primary/10 border border-primary/20 text-primary rounded text-xs font-semibold font-mono transition-colors"
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer nofollow' : undefined}
        >
          {rawText} <span className="text-[8px] opacity-70">🔗</span>
        </a>
      );
    }

    tokenIndex += 1;
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < input.length) {
    nodes.push(input.slice(lastIndex));
  }

  return nodes;
}

function renderSafeNode(node: ChildNode, key: string): React.ReactNode {
  if (node.nodeType === 3) return node.textContent || '';
  if (node.nodeType !== 1) return null;

  const element = node as Element;
  const tag = element.tagName.toLowerCase();
  if (forbiddenTags.has(tag)) return null;

  const children = Array.from(element.childNodes).map((child, index) =>
    renderSafeNode(child, key + '-' + index)
  );

  if (tag === 'a') {
    const href = safeHref(element.getAttribute('href'));
    if (!href) return <React.Fragment key={key}>{children}</React.Fragment>;
    const external = /^https:\/\//i.test(href);
    return (
      <a
        key={key}
        href={href}
        className="font-semibold text-primary underline underline-offset-4"
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer nofollow' : undefined}
      >
        {children}
      </a>
    );
  }

  if (tag === 'img' || tag === 'video' || tag === 'audio' || tag === 'source') return null;
  if (tag === 'br') return <br key={key} />;
  if (tag === 'hr') return <hr key={key} className={allowedTags.hr} />;

  const className = allowedTags[tag];
  if (className === undefined) {
    // Unknown elements are unwrapped; their attributes and behaviour are discarded.
    return <React.Fragment key={key}>{children}</React.Fragment>;
  }

  return React.createElement(
    tag,
    { key, className },
    ...children
  );
}

/**
 * Parses legacy editorial HTML into a strict React element allowlist.
 * All source attributes are discarded. Scripts, styles, forms, embeds, SVG,
 * images and event handlers are never copied into the rendered React tree.
 * This is a presentation sanitizer, not permission to accept patient data.
 */
export default function SafeHtmlContent({ html, className }: Props) {
  const content = useMemo(() => {
    const tokenRendered = renderAutoLinkTokens(html);
    if (tokenRendered) return tokenRendered;

    if (typeof DOMParser === 'undefined') return [html.replace(/<[^>]*>/g, '')];
    try {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      return Array.from(parsed.body.childNodes).map((node, index) =>
        renderSafeNode(node, String(index))
      );
    } catch {
      return [html.replace(/<[^>]*>/g, '')];
    }
  }, [html]);

  return <div className={className}>{content}</div>;
}
