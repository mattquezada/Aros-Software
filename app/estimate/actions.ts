'use server';

import { supabase } from '@/lib/supabase';
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

  const { error } = await supabase.from('estimate_requests').insert({
    name:          data.name.trim(),
    email:         data.email.trim().toLowerCase(),
    project_type:  data.projectType,
    pages:         data.pages,
    features:      data.features,
    timeline:      data.timeline,
    estimate_low:  data.estimateLow,
    estimate_high: data.estimateHigh,
  });

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, error: 'Submission failed. Please try again.' };
  }

  return { success: true };
}
