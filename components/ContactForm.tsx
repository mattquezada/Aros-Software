'use client';

import { useState, FormEvent } from 'react';
import { submitContact } from '@/app/contact/actions';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const result = await submitContact(form);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong.');
    }
  }

  if (status === 'success') {
    return (
      <div role="alert" className={styles.success}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Message Sent!</h3>
        <p className={styles.successText}>
          Thanks for reaching out. We&apos;ll get back to you within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className="field">
        <label htmlFor="contact-name" className="label">Name <span aria-hidden>*</span></label>
        <input
          id="contact-name"
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
        <label htmlFor="contact-email" className="label">Email <span aria-hidden>*</span></label>
        <input
          id="contact-email"
          type="email"
          className="input"
          placeholder="you@example.com"
          value={form.email}
          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
          required
          aria-required="true"
        />
      </div>

      <div className="field">
        <label htmlFor="contact-message" className="label">Message <span aria-hidden>*</span></label>
        <textarea
          id="contact-message"
          className="textarea"
          placeholder="Tell us about your project..."
          value={form.message}
          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
          required
          aria-required="true"
          rows={6}
        />
      </div>

      {status === 'error' && (
        <div role="alert" className="alertError">{errorMsg}</div>
      )}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
