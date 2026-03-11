import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Aros Software. We\'d love to hear about your project.',
};

const contactInfo = [
  {
    label: 'Instagram',
    value: '@arossoftware',
    href: 'https://instagram.com/arossoftware',
    external: true,
  },
  {
    label: 'Email',
    value: 'arossoftwaredev@gmail.com',
    href: 'mailto:arossoftwaredev@gmail.com',
    external: false,
  },
  {
    label: 'Phone',
    value: '(626) 419-4283',
    href: 'tel:+16264194283',
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Get in Touch</span>
          <h1 className={styles.title}>Contact</h1>
          <p className={styles.subtitle}>
            Have a project in mind? We&apos;d love to hear about it. Reach out and we&apos;ll get back to you within 1–2 business days.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={styles.info}>
            <h2 className={styles.infoTitle}>Reach Us Directly</h2>
            <ul className={styles.infoList}>
              {contactInfo.map(({ label, value, href, external }) => (
                <li key={label} className={styles.infoItem}>
                  <span className={styles.infoLabel}>{label}</span>
                  <a
                    href={href}
                    className={styles.infoLink}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {value}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.estimateCta}>
              <p className={styles.estimateCtaText}>
                Looking for a price estimate first?
              </p>
              <a href="/estimate" className="btn btn--outline-accent">
                Use Our Estimator →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formWrap}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
