import Link from 'next/link';
import { getResearchList } from '@/lib/research';
import styles from './page.module.css';

export default function Home() {
  const researchList = getResearchList();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Trading Research Lab</h1>
        <p className={styles.subtitle}>Quantitative Analysis & Strategy Reports</p>
      </header>

      <main>
        <div className={styles.grid}>
          {researchList.map((item) => (
            <Link 
              key={item.slug} 
              href={`/research/${item.slug}`}
              className={styles.card}
            >
              <h2 className={styles.itemTitle}>{item.title}</h2>
              {item.date && <p className={item.date}>{item.date}</p>}
              <p className={styles.excerpt}>{item.excerpt}</p>
              <span className={styles.readMore}>Read Report →</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Trading Research Lab - Internal Access Only</p>
      </footer>
    </div>
  );
}
