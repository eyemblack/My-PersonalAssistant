import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const researchDirectory = path.join(process.cwd(), '../research');

export interface ResearchItem {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  content: string;
}

export function getAllResearchSlugs() {
  const fileNames = fs.readdirSync(researchDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export function getResearchList(): Omit<ResearchItem, 'content'>[] {
  const fileNames = fs.readdirSync(researchDirectory);
  const allResearchData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(researchDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // If title is not in frontmatter, try to find the first H1 in content
      let title = data.title;
      if (!title) {
        const match = content.match(/^#\s+(.*)$/m);
        title = match ? match[1] : slug;
      }

      return {
        slug,
        title,
        date: data.date || '',
        excerpt: data.excerpt || content.slice(0, 150) + '...',
      };
    });

  return allResearchData;
}

export async function getResearchData(slug: string): Promise<ResearchItem> {
  const fullPath = path.join(researchDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  let title = data.title;
  if (!title) {
    const match = content.match(/^#\s+(.*)$/m);
    title = match ? match[1] : slug;
  }

  return {
    slug,
    title,
    date: data.date || '',
    content,
    ...data,
  };
}
