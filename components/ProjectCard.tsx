import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  name: string;
  description: string;
  domain: string;
  url: string;
  tags: string[];
}

export default function ProjectCard({ name, description, domain, url, tags }: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.domain}>{domain}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.liveLink}
      >
        View Live <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
