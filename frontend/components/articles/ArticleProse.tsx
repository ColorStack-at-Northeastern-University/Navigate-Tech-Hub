import ArticleMarkdown from '@/components/articles/ArticleMarkdown';
import { prepareArticleMarkdown } from '@/lib/articleContent';

type ArticleProseProps = {
    rawMarkdown: string;
    articleTitle: string;
};

/**
 * Single render path for every internal guide body (Strapi `content` field).
 * Strips draft frontmatter, removes duplicate title headings, then renders GFM.
 */
export default function ArticleProse({ rawMarkdown, articleTitle }: ArticleProseProps) {
    const markdown = prepareArticleMarkdown(rawMarkdown, { articleTitle });

    return (
        <div className="article-prose">
            <ArticleMarkdown markdown={markdown} />
        </div>
    );
}
