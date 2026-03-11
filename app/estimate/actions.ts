'use server';

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import type { ProjectType, Timeline, Feature } from '@/lib/estimatePricing';

interface EstimateFormData {
  name: string;
  email: string;
  projectType: ProjectType;
  pages: number;
  features: Feature[];
  timeline: Timeline;
  estimateLow: number;
  estimateHigh: number;
}

const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  landing:   'Landing Page',
  brochure:  'Brochure Site',
  ecommerce: 'E-commerce Store',
  webapp:    'Web Application',
  custom:    'Custom / Not Sure',
};

const FEATURE_LABELS: Record<Feature, string> = {
  cms:             'Content Management (CMS)',
  auth:            'User Authentication / Login',
  api_integration: 'Third-party API Integration',
  seo:             'SEO Optimization Package',
  animations:      'Custom Animations',
  multilingual:    'Multi-language Support',
};

const TIMELINE_LABELS: Record<Timeline, string> = {
  rush:     'Rush (within 2 weeks)',
  standard: 'Standard (4–6 weeks)',
  flexible: 'Flexible (2–3 months)',
};

export async function submitEstimate(data: EstimateFormData) {
  if (!data.name?.trim() || !data.email?.trim()) {
    return { success: false, error: 'Name and email are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (data.pages < 1 || data.pages > 500) {
    return { success: false, error: 'Please enter a valid page count.' };
  }

  const name     = data.name.trim();
  const email    = data.email.trim().toLowerCase();
  const estimate = `$${data.estimateLow.toLocaleString()} – $${data.estimateHigh.toLocaleString()}`;

  // Save to Supabase
  const { error: dbError } = await supabase.from('estimate_requests').insert({
    name,
    email,
    project_type:  data.projectType,
    pages:         data.pages,
    features:      data.features,
    timeline:      data.timeline,
    estimate_low:  data.estimateLow,
    estimate_high: data.estimateHigh,
  });

  if (dbError) {
    console.error('Supabase error:', dbError);
    return { success: false, error: 'Submission failed. Please try again.' };
  }

  // Send email notification
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const featuresHtml = data.features.length > 0
      ? data.features.map(f => `<li>${FEATURE_LABELS[f]}</li>`).join('')
      : '<li>None selected</li>';

    await resend.emails.send({
      from: 'Aros Software <onboarding@resend.dev>',
      to: 'arossoftwaredev@gmail.com',
      replyTo: email,
      subject: `New estimate request from ${name} — ${estimate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #111;">
          <h2 style="margin-bottom: 4px;">New Estimate Request</h2>
          <p style="color: #666; margin-top: 0; font-size: 14px;">Via arossoftware.vercel.app</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

          <p><strong>Project Type:</strong> ${PROJECT_TYPE_LABELS[data.projectType]}</p>
          <p><strong>Pages:</strong> ${data.pages}</p>
          <p><strong>Timeline:</strong> ${TIMELINE_LABELS[data.timeline]}</p>

          <p><strong>Features:</strong></p>
          <ul style="margin: 4px 0 16px; padding-left: 20px; color: #333;">
            ${featuresHtml}
          </ul>

          <div style="background: #f5f5f5; border-left: 4px solid #cc0000; padding: 16px; border-radius: 4px; margin-top: 8px;">
            <p style="margin: 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.1em;">Estimated Range</p>
            <p style="margin: 4px 0 0; font-size: 1.6rem; font-weight: 800; color: #cc0000;">${estimate}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });
  }

  return { success: true };
}
