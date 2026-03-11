import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A showcase of websites and web applications built by Aros Software.',
};

const projects = [
  {
    name: "Amia's Bakery",
    description: "A warm, inviting website for a local artisan bakery. Features an online menu, custom photography integration, and contact forms to handle orders and inquiries.",
    domain: "amiasbakery.com",
    url: "https://amiasbakery.com",
    tags: ["Next.js", "CSS Modules", "Vercel"],
  },
  {
    name: "Premier Real Estate",
    description: "Professional real estate agent portfolio for Logan Corral. Includes property listings, client testimonials, and lead capture forms to drive inquiries.",
    domain: "realtorlogancorral.com",
    url: "https://realtorlogancorral.com",
    tags: ["Next.js", "Supabase", "Vercel"],
  },
  {
    name: "Voltforge",
    description: "Bold, conversion-focused landing page for a modern tech product. Features sharp design, animated feature showcases, and CTA optimization.",
    domain: "voltforge.vercel.app",
    url: "https://voltforge.vercel.app",
    tags: ["Next.js", "TypeScript", "Vercel"],
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Our Work</span>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            A selection of websites and applications we&apos;ve built for our clients.
          </p>
        </div>

        <div className={styles.grid}>
          {projects.map(project => (
            <ProjectCard key={project.domain} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
