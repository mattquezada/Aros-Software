'use server';

import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

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

  const name    = data.name.trim();
  const email   = data.email.trim().toLowerCase();
  const message = data.message.trim();

  // Save to Supabase
  const { error: dbError } = await supabase.from('contact_submissions').insert({
    name,
    email,
    message,
  });

  if (dbError) {
    console.error('Supabase error:', dbError);
    return { success: false, error: 'Submission failed. Please try again.' };
  }

  // Send email notification
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Aros Software <onboarding@resend.dev>',
      to: 'arossoftwaredev@gmail.com',
      replyTo: email,
      subject: `New contact from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; color: #111;">
          <h2 style="margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #666; margin-top: 0; font-size: 14px;">Via arossoftware.vercel.app</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="background: #f5f5f5; padding: 16px; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });
  }

  return { success: true };
}
