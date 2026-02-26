import Link from 'next/link'

export const metadata = {
  title: 'Learn — LuminaOS by RK AI',
  description: 'Discover the features, AI integrations, and the story behind LuminaOS.',
}

const features = [
  { icon: '🤖', title: 'RK AI Integration', desc: 'Ask questions, control your OS, and get AI insights using the built-in RK AI assistant — powered by the Gemini API.' },
  { icon: '🗂️', title: 'LumiNexplorer', desc: 'A full-featured file explorer with local file management and SparkDrive cloud storage — all inside your browser.' },
  { icon: '🌐', title: 'Vertice Browser', desc: 'Browse the internet without ever leaving LuminaOS. Vertice is a friction-free embedded browser with proxy support.' },
  { icon: '🌦️', title: 'Weather App', desc: 'Real-time weather for any city in the world. Temperature, humidity, wind, and more at a glance.' },
  { icon: '⏱️', title: 'Clock & Timer', desc: 'A fully functional clock, stopwatch, and countdown timer — always accessible from the dock.' },
  { icon: '🧮', title: 'Calculator', desc: 'A sleek, fast calculator for quick arithmetic without switching contexts.' },
  { icon: '📦', title: 'Sparking Store', desc: 'Install social apps like Facebook, Instagram, Spotify, and more as windowed experiences inside LuminaOS.' },
  { icon: '⚙️', title: 'Settings', desc: 'Customize your OS: change wallpapers, manage appearance, update your pin, and configure notifications.' },
]

export default function Learn() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 60%, #000000 100%)',
      fontFamily: "'Inter', sans-serif",
      color: '#f8fafc',
      padding: '60px 20px',
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Back */}
        <Link href="/" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          ← Back to Home
        </Link>

        {/* Hero */}
        <div style={{ textAlign: 'center', margin: '40px 0 60px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(79,70,229,0.12)',
            border: '1px solid rgba(79,70,229,0.3)',
            borderRadius: '50px', padding: '6px 18px',
            fontSize: '12px', fontWeight: '700', color: '#a78bfa',
            letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '24px',
          }}>
            🧠 LEARN LUMINAOS
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 58px)', fontWeight: '900', letterSpacing: '-2px',
            background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>
            Meet the Future of the Web OS
          </h1>
          <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
            LuminaOS is a browser-based operating system developed by <strong style={{ color: '#a78bfa' }}>RK AI</strong>.
            It gives you a full desktop experience directly in your browser, powered by cutting-edge AI.
          </p>
        </div>

        {/* Story */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '20px', padding: '32px', marginBottom: '48px',
          backdropFilter: 'blur(10px)',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '14px', color: '#f1f5f9' }}>About LuminaOS</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: '15px' }}>
            LuminaOS is currently at <strong style={{ color: '#60a5fa' }}>Version 1.1</strong>. It started as a
            browser experiment and has grown into a fully functional AI-first OS environment. From a rich taskbar,
            movable windows, wallpaper customization, to an integrated AI assistant — LuminaOS is built to
            feel like a real operating system. Many more apps and features are coming soon to the Sparking Store.
          </p>
        </div>

        {/* Features Grid */}
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-0.5px' }}>Features</h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px', marginBottom: '60px',
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px', padding: '22px', backdropFilter: 'blur(8px)',
            }}>
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(155,89,245,0.1), rgba(79,70,229,0.1))',
          border: '1px solid rgba(79,70,229,0.25)',
          borderRadius: '20px', padding: '36px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>⚡</div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            RK AI Powers Everything
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 24px' }}>
            From the AI search assistant to smart weather lookups and clipboard intelligence —
            every corner of LuminaOS is infused with RK AI's neural engine.
          </p>
          <Link href="/lumina-os" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #9b59f5, #4f46e5)',
            color: '#fff', padding: '14px 32px', borderRadius: '50px',
            fontWeight: '700', textDecoration: 'none', fontSize: '15px',
          }}>
            Launch LuminaOS →
          </Link>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');`}</style>
    </main>
  )
}