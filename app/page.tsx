import Link from 'next/link';
import Logo from '@/components/Logo';
import styles from './page.module.css';

const testimonials = [
  {
    quote: "Aros Software completely transformed our online presence. The new site is fast, beautiful, and our customers constantly compliment how easy it is to browse the menu and place orders.",
    name: "Amia R.",
    role: "Owner, Amia's Bakery",
  },
  {
    quote: "Working with Aros Software was seamless from start to finish. They built exactly what I envisioned — a professional site that generates real leads and reflects the quality of my brand.",
    name: "Logan Corral",
    role: "Realtor, Premier Real Estate",
  },
  {
    quote: "The Voltforge landing page exceeded every expectation. Clean design, lightning-fast load times, and it was delivered ahead of schedule. Highly recommend.",
    name: "Chris V.",
    role: "Founder, Voltforge",
  },
];

const services = [
  {
    title: 'Custom Websites',
    description: 'Pixel-perfect, responsive websites built to match your brand and convert visitors.',
  },
  {
    title: 'Web Applications',
    description: 'Full-stack apps with real-time features, authentication, and scalable architecture.',
  },
  {
    title: 'E-commerce Stores',
    description: 'Online stores built to drive sales with smooth checkout experiences.',
  },
  {
    title: 'API Integrations',
    description: 'Connect your business tools, payment systems, and third-party services seamlessly.',
  },
  {
    title: 'SEO & Performance',
    description: 'Optimized for speed and search rankings so you get found and keep visitors engaged.',
  },
  {
    title: 'Maintenance & Support',
    description: 'Ongoing care to keep your site fast, secure, and up to date.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <Logo size="xl" linkTo="" />
          <h1 className={styles.headline}>
            We build digital<br />
            <span className={styles.accent}>experiences.</span>
          </h1>
          <p className={styles.subhead}>
            Custom websites, web applications, and software for businesses<br className={styles.br} /> that want to stand out.
          </p>
          <div className={styles.ctas}>
            <Link href="/estimate" className="btn btn--primary">Get an Estimate</Link>
            <Link href="/projects" className="btn btn--ghost">View Our Work</Link>
          </div>
        </div>

        <div className={styles.heroDivider} aria-hidden="true" />
      </section>

      {/* Services */}
      <section className={`section ${styles.services}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>What We Build</span>
            <h2 className={styles.sectionTitle}>End-to-end digital solutions</h2>
          </div>

          <ul className={styles.servicesGrid}>
            {services.map(({ title, description }) => (
              <li key={title} className={styles.serviceItem}>
                <span className={styles.serviceAccent} aria-hidden="true">—</span>
                <div>
                  <h3 className={styles.serviceTitle}>{title}</h3>
                  <p className={styles.serviceDesc}>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.testimonials}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Client Stories</span>
            <h2 className={styles.sectionTitle}>What our clients say</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map(({ quote, name, role }) => (
              <figure key={name} className={styles.testimonialCard}>
                <span className={styles.testimonialQuoteMark} aria-hidden="true">&ldquo;</span>
                <blockquote className={styles.testimonialQuote}>{quote}</blockquote>
                <figcaption className={styles.testimonialAuthor}>
                  <span className={styles.testimonialName}>{name}</span>
                  <span className={styles.testimonialRole}>{role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaInner}`}>
          <div>
            <h2 className={styles.ctaTitle}>Ready to start your project?</h2>
            <p className={styles.ctaDesc}>Tell us about your idea and we&apos;ll put together a custom estimate.</p>
          </div>
          <Link href="/contact" className="btn btn--primary">Talk to Us</Link>
        </div>
      </section>
    </>
  );
}
