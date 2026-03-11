import Link from 'next/link';
import styles from './Logo.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  linkTo?: string;
}

export default function Logo({ size = 'md', linkTo = '/' }: LogoProps) {
  const content = (
    <div className={`${styles.logo} ${styles[size]}`}>
      <span className={styles.icon}>&lt;/&gt;</span>
      <div className={styles.wordmark}>
        <span className={styles.name}>AROS</span>
        <span className={styles.sub}>SOFTWARE</span>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link href={linkTo} className={styles.link}>{content}</Link>;
  }
  return content;
}
