'use client';

import { useState, FormEvent } from 'react';
import { calculateEstimate } from '@/lib/estimatePricing';
import type { ProjectType, Timeline, Feature } from '@/lib/estimatePricing';
import { submitEstimate } from '@/app/estimate/actions';
import styles from './EstimateForm.module.css';

const PROJECT_TYPES: { value: ProjectType; label: string; desc: string }[] = [
  { value: 'landing',   label: 'Landing Page',     desc: 'Single page, focused CTA' },
  { value: 'brochure',  label: 'Brochure Site',     desc: 'Multi-page business site' },
  { value: 'ecommerce', label: 'E-commerce Store',  desc: 'Online store with checkout' },
  { value: 'webapp',    label: 'Web Application',   desc: 'Full-stack app with auth' },
  { value: 'custom',    label: 'Custom / Not Sure',  desc: 'Tell us more' },
];

const FEATURES: { value: Feature; label: string }[] = [
  { value: 'cms',             label: 'Content Management (CMS)' },
  { value: 'auth',            label: 'User Authentication / Login' },
  { value: 'api_integration', label: 'Third-party API Integration' },
  { value: 'seo',             label: 'SEO Optimization Package' },
  { value: 'animations',      label: 'Custom Animations' },
  { value: 'multilingual',    label: 'Multi-language Support' },
];

const TIMELINES: { value: Timeline; label: string; note: string }[] = [
  { value: 'rush',     label: 'Rush',     note: 'Within 2 weeks (+35%)' },
  { value: 'standard', label: 'Standard', note: '4–6 weeks' },
  { value: 'flexible', label: 'Flexible', note: '2–3 months (−10%)' },
];

export default function EstimateForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'brochure' as ProjectType,
    pages: 5,
    features: [] as Feature[],
    timeline: 'standard' as Timeline,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const estimate = calculateEstimate({
    projectType: form.projectType,
    pages: form.pages,
    features: form.features,
    timeline: form.timeline,
  });

  function toggleFeature(f: Feature) {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter(x => x !== f)
        : [...prev.features, f],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const result = await submitEstimate({
      ...form,
      estimateLow: estimate.low,
      estimateHigh: estimate.high,
    });

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Request Received!</h2>
        <p className={styles.successText}>
          We&apos;ll review your project details and reach out within 1–2 business days with a detailed quote.
        </p>
        <p className={styles.successEstimate}>
          Your estimate: <strong>{estimate.label}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Contact Info */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Your Info</h3>
          <div className={styles.row}>
            <div className="field">
              <label htmlFor="name" className="label">Name <span aria-hidden>*</span></label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                required
                aria-required="true"
              />
            </div>
            <div className="field">
              <label htmlFor="email" className="label">Email <span aria-hidden>*</span></label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                required
                aria-required="true"
              />
            </div>
          </div>
        </div>

        {/* Project Type */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Project Type</h3>
          <div className={styles.typeGrid}>
            {PROJECT_TYPES.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                className={`${styles.typeCard} ${form.projectType === value ? styles.typeCardActive : ''}`}
                onClick={() => setForm(p => ({ ...p, projectType: value }))}
              >
                <span className={styles.typeLabel}>{label}</span>
                <span className={styles.typeDesc}>{desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Estimated Number of Pages</h3>
          <div className={styles.pagesRow}>
            <input
              id="pages"
              type="number"
              className={`input ${styles.pagesInput}`}
              min={1}
              max={500}
              value={form.pages}
              onChange={e => setForm(p => ({ ...p, pages: Math.max(1, parseInt(e.target.value) || 1) }))}
              aria-label="Number of pages"
            />
            <span className={styles.pagesNote}>pages</span>
          </div>
        </div>

        {/* Features */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Features Needed</h3>
          <div className={styles.featuresGrid}>
            {FEATURES.map(({ value, label }) => (
              <label key={value} className={`${styles.featureCheck} ${form.features.includes(value) ? styles.featureCheckActive : ''}`}>
                <input
                  type="checkbox"
                  checked={form.features.includes(value)}
                  onChange={() => toggleFeature(value)}
                  className={styles.hiddenCheck}
                />
                <span className={styles.checkmark} aria-hidden="true">
                  {form.features.includes(value) ? '✓' : ''}
                </span>
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Timeline</h3>
          <div className={styles.timelineGroup}>
            {TIMELINES.map(({ value, label, note }) => (
              <label
                key={value}
                className={`${styles.timelineOption} ${form.timeline === value ? styles.timelineActive : ''}`}
              >
                <input
                  type="radio"
                  name="timeline"
                  value={value}
                  checked={form.timeline === value}
                  onChange={() => setForm(p => ({ ...p, timeline: value }))}
                  className={styles.hiddenCheck}
                />
                <span className={styles.timelineLabel}>{label}</span>
                <span className={styles.timelineNote}>{note}</span>
              </label>
            ))}
          </div>
        </div>

        {status === 'error' && (
          <div role="alert" className="alertError">{errorMsg}</div>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === 'submitting'}
          style={{ alignSelf: 'flex-start' }}
        >
          {status === 'submitting' ? 'Sending...' : 'Request Full Quote'}
        </button>
      </form>

      {/* Live Price Display */}
      <div className={styles.pricePanel}>
        <div className={styles.pricePanelInner}>
          <span className={styles.priceLabel}>Estimated Range</span>
          <span className={styles.priceValue}>{estimate.label}</span>
          <p className={styles.priceNote}>
            Final quote provided after a discovery call. Price varies by scope and complexity.
          </p>

          <div className={styles.breakdown}>
            <p className={styles.breakdownTitle}>Includes:</p>
            <ul className={styles.breakdownList}>
              <li>Custom design & development</li>
              <li>Mobile responsive layout</li>
              <li>Deployment & hosting setup</li>
              {form.features.map(f => (
                <li key={f} className={styles.featureBreakdown}>
                  {FEATURES.find(x => x.value === f)?.label}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.ctaNote}>
            <span>Questions?</span>
            <a href="mailto:arossoftwaredev@gmail.com" className={styles.ctaNoteLink}>
              Email us directly →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
