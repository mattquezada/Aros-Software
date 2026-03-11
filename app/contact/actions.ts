'use server';

import { supabase } from '@/lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(data: ContactFormData) {
  if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
    return { success: false, error: 'All fields are required.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (data.message.length > 2000) {
    return { success: false, error: 'Message is too long (max 2000 characters).' };
  }

  const { error } = await supabase.from('contact_submissions').insert({
    name:    data.name.trim(),
    email:   data.email.trim().toLowerCase(),
    message: data.message.trim(),
  });

  if (error) {
    console.error('Supabase error:', error);
    return { success: false, error: 'Submission failed. Please try again.' };
  }

  return { success: true };
}
