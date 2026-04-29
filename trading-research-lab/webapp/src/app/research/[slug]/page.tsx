import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getResearchData, getAllResearchSlugs } from '@/lib/research';
import Link from 'next/link';
import styles from './research.module.css';

export async function generateStaticParams() {
  const slugs = getAllResearchSlugs();
  return slugs;
}

export default async function ResearchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const research = await getResearchData(slug);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Back to Research Lab
        </Link>
        <h1 className={styles.title}>{research.title}</h1>
        {research.date && <p className={styles.date}>{research.date}</p>}
      </header>
      
      <main className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {research.content}
        </ReactMarkdown>
      </main>
    </div>
  );
}
