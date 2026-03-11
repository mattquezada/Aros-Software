import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog & Case Studies',
  description: 'Behind-the-scenes looks at how Aros Software designs and builds websites and web applications for clients.',
};

const posts = [
  {
    slug: 'amias-bakery',
    title: "Building Amia's Bakery: A Local Business Website That Converts",
    date: 'February 2026',
    readTime: '4 min read',
    excerpt: "How we designed a warm, conversion-focused website for a local artisan bakery — from initial brand discovery to launch day.",
    tags: ['Next.js', 'CSS Modules', 'Small Business'],
    url: 'https://amiasbakery.com',
  },
  {
    slug: 'premier-real-estate',
    title: 'Premier Real Estate: A Lead-Generating Portfolio for a Modern Realtor',
    date: 'March 2026',
    readTime: '5 min read',
    excerpt: "Logan Corral needed more than a business card website. Here's how we built a full lead-capture system around his personal brand.",
    tags: ['Next.js', 'Supabase', 'Real Estate'],
    url: 'https://realtorlogancorral.com',
  },
  {
    slug: 'voltforge',
    title: 'Voltforge: Designing a High-Impact Product Landing Page',
    date: 'March 2026',
    readTime: '3 min read',
    excerpt: "Product landing pages live and die by their above-the-fold design. Here's the thinking behind Voltforge's bold, conversion-focused layout.",
    tags: ['Next.js', 'TypeScript', 'Landing Page'],
    url: 'https://voltforge.vercel.app',
  },
];

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Insights</span>
          <h1 className={styles.title}>Blog & Case Studies</h1>
          <p className={styles.subtitle}>
            A behind-the-scenes look at how we think about design, development, and building for the web.
          </p>
        </div>

        <div className={styles.posts}>
          {posts.map(({ slug, title, date, readTime, excerpt, tags, url }) => (
            <article key={slug} className={styles.post}>
              <div className={styles.postMeta}>
                <span className={styles.postDate}>{date}</span>
                <span className={styles.postDot} aria-hidden="true">·</span>
                <span className={styles.postRead}>{readTime}</span>
              </div>
              <h2 className={styles.postTitle}>{title}</h2>
              <p className={styles.postExcerpt}>{excerpt}</p>
              <div className={styles.postFooter}>
                <div className={styles.postTags}>
                  {tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.postLink}
                >
                  View Live Site →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <p>Want a site like these?</p>
          <Link href="/estimate" className="btn btn--primary">Get an Estimate</Link>
        </div>
      </div>
    </div>
  );
}
