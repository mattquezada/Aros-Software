import Link from 'next/link';
import Logo from './Logo';
import styles from './Footer.module.css';

const links = [
  { href: '/',         label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/estimate', label: 'Estimate' },
  { href: '/contact',  label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo size="sm" linkTo="/" />
          <p className={styles.tagline}>Building digital experiences.</p>
        </div>

        <nav className={styles.nav}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className={styles.link}>{label}</Link>
          ))}
        </nav>

        <div className={styles.social}>
          <a href="https://instagram.com/arossoftware" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Instagram
          </a>
          <a href="mailto:arossoftwaredev@gmail.com" className={styles.socialLink}>
            Email
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy}>© {year} Aros Software. All rights reserved.</p>
      </div>
    </footer>
  );
}
