'use client';

import Link from 'next/link'

const metadata = {
  title: 'LuminaOS — Powered by RK AI',
  description: 'LuminaOS is a next-generation AI-powered browser operating system built by RK AI.',
}

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 60%, #000000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#f8fafc',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 20px',
    }}>
      {/* Glowing orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header badge */}
      <div style={{
        background: 'rgba(59,130,246,0.12)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '50px',
        padding: '6px 18px',
        fontSize: '12px',
        fontWeight: '700',
        color: '#60a5fa',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        marginBottom: '28px',
      }}>
        ⚡ POWERED BY RK AI
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: 'clamp(42px, 8vw, 80px)',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #a78bfa 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1.1,
        letterSpacing: '-2px',
      }}>
        LuminaOS
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#94a3b8',
        textAlign: 'center',
        maxWidth: '500px',
        marginBottom: '60px',
        lineHeight: 1.6,
        fontWeight: '400',
      }}>
        A next-generation AI-powered browser OS. Intelligent, fast, and always on.
      </p>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        width: '100%',
      }}>
        {[
          {
            href: '/lumina-os',
            emoji: '🚀',
            title: 'Launch OS',
            desc: 'Boot into LuminaOS and feel the power of illumination.',
            accent: '#3b82f6',
          },
          {
            href: '/learn',
            emoji: '🧠',
            title: 'Learn',
            desc: 'Discover what makes LuminaOS the future of computing.',
            accent: '#8b5cf6',
          },
          {
            href: '/contact',
            emoji: '💬',
            title: 'Contact Us',
            desc: 'Reach the RK AI team quickly with any queries.',
            accent: '#06b6d4',
          },
          {
            href: '/signup',
            emoji: '✨',
            title: 'Create Account',
            desc: 'Join the LuminaOS ecosystem and start your AI journey.',
            accent: '#10b981',
          },
        ].map((card) => (
          <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '20px',
              padding: '28px 24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.borderColor = card.accent + '55';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${card.accent}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{card.emoji}</div>
              <h2 style={{
                fontSize: '20px', fontWeight: '800', color: '#f1f5f9',
                marginBottom: '8px', letterSpacing: '-0.5px',
              }}>{card.title} →</h2>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer hint */}
      <p style={{ marginTop: '60px', color: '#334155', fontSize: '13px', fontWeight: '500' }}>
        LuminaOS v1.1 · Built on RK AI Technology
      </p>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');`}</style>
    </main>
  )
}