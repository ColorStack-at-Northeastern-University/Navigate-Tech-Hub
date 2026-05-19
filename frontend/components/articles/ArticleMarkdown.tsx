import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import { Children, isValidElement } from 'react';
import { headingTextFromChildren, slugifyHeadingText } from '@/lib/slugifyHeading';

function blockquoteLooksLikeCallout(children: ReactNode): boolean {
    const nodes = Children.toArray(children);
    for (const node of nodes) {
        if (!isValidElement(node)) continue;
        if (node.type === 'h3') return true;
        if (node.type === 'p') {
            const paragraphChildren = (node.props as { children?: ReactNode }).children;
            const text = Children.toArray(paragraphChildren ?? []).join('').trim();
            if (/^(key takeaways|research snapshot|warning)/i.test(text)) return true;
        }
    }
    return false;
}

function headingId(children: ReactNode): string | undefined {
    const text = headingTextFromChildren(children).trim();
    if (!text) return undefined;
    const id = slugifyHeadingText(text);
    return id || undefined;
}

const markdownComponents: Components = {
    h1: ({ children }) => (
        <h2 className="article-prose__in-body-title">{children}</h2>
    ),
    h2: ({ children }) => {
        const id = headingId(children);
        return (
            <h2 id={id} className="article-prose__h2">
                {children}
            </h2>
        );
    },
    h3: ({ children }) => {
        const id = headingId(children);
        return (
            <h3 id={id} className="article-prose__h3">
                {children}
            </h3>
        );
    },
    h4: ({ children }) => (
        <h4 className="article-prose__h4">{children}</h4>
    ),
    p: ({ children }) => <p className="article-prose__p">{children}</p>,
    ul: ({ children }) => <ul className="article-prose__ul">{children}</ul>,
    ol: ({ children }) => <ol className="article-prose__ol">{children}</ol>,
    li: ({ children }) => <li className="article-prose__li">{children}</li>,
    hr: () => <hr className="article-prose__section-break" aria-hidden="true" />,
    blockquote: ({ children }) => {
        const callout = blockquoteLooksLikeCallout(children);
        return (
            <blockquote className={callout ? 'article-prose__callout' : 'article-prose__pullquote'}>
                {children}
            </blockquote>
        );
    },
    table: ({ children }) => (
        <div className="article-prose__table-wrap" tabIndex={0}>
            <table className="article-prose__table">{children}</table>
        </div>
    ),
    thead: ({ children }) => <thead className="article-prose__thead">{children}</thead>,
    tbody: ({ children }) => <tbody className="article-prose__tbody">{children}</tbody>,
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => <th scope="col">{children}</th>,
    td: ({ children }) => <td>{children}</td>,
    code: ({ className, children, ...props }) => {
        const isBlock = Boolean(className?.includes('language-'));
        if (isBlock) {
            return (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
        return (
            <code className="article-prose__inline-code" {...props}>
                {children}
            </code>
        );
    },
    pre: ({ children }) => <pre className="article-prose__pre">{children}</pre>,
};

/** Renders article markdown (GFM) with shared Navigate typography for every internal guide. */
export default function ArticleMarkdown({ markdown }: { markdown: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdown}
        </ReactMarkdown>
    );
}
