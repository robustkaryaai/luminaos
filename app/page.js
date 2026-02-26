'use client';

import Link from 'next/link'

const cards = [
  {
    href: '/lumina-os',
    emoji: '⚡',
    title: 'Launch OS',
    desc: 'Boot into LuminaOS and feel the power of illumination.',
  },
  {
    href: '/learn',
    emoji: '🧠',
    title: 'Learn',
    desc: 'Discover what makes LuminaOS the future of browser computing.',
  },
  {
    href: '/contact',
    emoji: '💬',
    title: 'Contact Us',
    desc: 'Reach the RK AI team quickly with any question.',
  },
  {
    href: '/signup',
    emoji: '✨',
    title: 'Create Account',
    desc: 'Join the LuminaOS ecosystem and start your AI journey.',
  },
]

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #06091a; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06091a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #4f46e5, #9b59f5); border-radius: 50px; }

        .lmain {
          min-height: 100vh;
          background: radial-gradient(ellipse at 50% -10%, rgba(155,89,245,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(79,70,229,0.12) 0%, transparent 50%),
                      #06091a;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          font-family: 'Inter', sans-serif; color: #f8fafc;
          padding: 60px 20px;
          position: relative; overflow: hidden;
        }
        .lbadge {
          background: rgba(155,89,245,0.12);
          border: 1px solid rgba(155,89,245,0.35);
          border-radius: 50px; padding: 6px 18px;
          font-size: 11px; font-weight: 700; color: #b78fff;
          letter-spacing: 1.5px; text-transform: uppercase;
          margin-bottom: 28px;
        }
        .ltitle {
          font-size: clamp(48px, 9vw, 88px);
          font-weight: 900; letter-spacing: -3px;
          background: linear-gradient(135deg, #ffffff 0%, #c4a0ff 50%, #9b59f5 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          text-align: center; line-height: 1.05; margin-bottom: 18px;
        }
        .lsub {
          color: #64748b; font-size: 17px; text-align: center;
          max-width: 480px; line-height: 1.7; margin-bottom: 64px;
          font-weight: 400;
        }
        .lgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px; max-width: 600px; width: 100%; margin: 0 auto;
        }
        .lcard {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(155,89,245,0.15);
          border-radius: 20px; padding: 28px 24px;
          text-decoration: none; color: inherit;
          transition: all 0.25s ease;
          display: block; cursor: pointer;
        }
        .lcard:hover {
          background: rgba(155,89,245,0.08);
          border-color: rgba(155,89,245,0.4);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(155,89,245,0.15);
        }
        .lcard-emoji { font-size: 32px; margin-bottom: 16px; }
        .lcard-title { font-size: 18px; font-weight: 800; color: #f1f5f9; margin-bottom: 8px; letter-spacing: -0.3px; }
        .lcard-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
        .lfooter { margin-top: 64px; color: #1e293b; font-size: 13px; font-weight: 500; }
      `}</style>

      <main className="lmain">
        {/* top glow blob */}
        <div style={{
          position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(155,89,245,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div className="lbadge">⚡ Powered by RK AI</div>

        <h1 className="ltitle">LuminaOS</h1>
        <p className="lsub">A next-gen AI-powered browser OS. Intelligent, fast, and always on.</p>

        <div className="lgrid">
          {cards.map(c => (
            <Link key={c.href} href={c.href} className="lcard">
              <div className="lcard-emoji">{c.emoji}</div>
              <div className="lcard-title">{c.title} →</div>
              <div className="lcard-desc">{c.desc}</div>
            </Link>
          ))}
        </div>

        <p className="lfooter">LuminaOS v1.1 · Built on RK AI Technology</p>
      </main>
    </>
  )
}