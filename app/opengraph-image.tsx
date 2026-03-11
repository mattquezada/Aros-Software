import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Aros Software — We build digital experiences.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '48px' }}>
          <span style={{ color: '#cc0000', fontSize: '52px', fontWeight: 800 }}>
            {'</>'}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #333', paddingLeft: '20px', gap: '4px' }}>
            <span style={{ color: '#ffffff', fontSize: '38px', fontWeight: 800, letterSpacing: '0.05em' }}>
              AROS
            </span>
            <span style={{ color: '#999999', fontSize: '13px', letterSpacing: '0.3em' }}>
              SOFTWARE
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', maxWidth: '800px' }}>
          We build digital{' '}
          <span style={{ color: '#cc0000' }}>experiences.</span>
        </div>

        {/* Subhead */}
        <div style={{ color: '#999999', fontSize: '26px', marginTop: '28px', maxWidth: '700px', lineHeight: 1.5 }}>
          Custom websites, web apps & software for businesses that stand out.
        </div>

        {/* Domain */}
        <div style={{ color: '#555555', fontSize: '20px', marginTop: '48px', letterSpacing: '0.05em' }}>
          arossw.com
        </div>
      </div>
    ),
    { ...size }
  );
}
