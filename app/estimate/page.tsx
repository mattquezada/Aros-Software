import type { Metadata } from 'next';
import EstimateForm from '@/components/EstimateForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Get an Estimate',
  description: 'Use our interactive estimator to get a ballpark cost for your website or web application project.',
};

export default function EstimatePage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Pricing</span>
          <h1 className={styles.title}>Get an Estimate</h1>
          <p className={styles.subtitle}>
            Configure your project below to get an instant price range. We&apos;ll follow up with a detailed quote after a short discovery call.
          </p>
        </div>

        <EstimateForm />
      </div>
    </div>
  );
}
