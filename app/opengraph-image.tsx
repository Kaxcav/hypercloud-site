import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hypercloud — Premier Google Cloud Partner';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(249, 115, 22, 0.4)',
              background: 'rgba(249, 115, 22, 0.15)',
              color: '#fb923c',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}
          >
            Premier Google Cloud Partner
          </div>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>ATAs Vigentes · Setor Público e Privado</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              color: '#ffffff'
            }}
          >
            Google Workspace, Gemini, Cloud e AppSheet
          </div>
          <div style={{ fontSize: '24px', color: '#cbd5e1', lineHeight: 1.4 }}>
            Soluções corporativas e governamentais com credenciais oficiais, contrato direto e suporte especializado no Brasil.
          </div>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '32px'
          }}
        >
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#f97316' }}>HYPERCLOUD</div>
          <div style={{ fontSize: '16px', color: '#64748b' }}>www.hypercloud.com.br</div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
