'use client';

import { useEffect, useState } from 'react';
import { Client, Databases, ID } from 'appwrite';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

function generateRandomCode() {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    if (i === 1 || i === 3) code += '-';
    if (i === 0) code += alpha[Math.floor(Math.random() * alpha.length)];
    else code += Math.floor(Math.random() * 10);
    code += alpha[Math.floor(Math.random() * alpha.length)];
    code += alpha[Math.floor(Math.random() * alpha.length)];
    code += alpha[Math.floor(Math.random() * alpha.length)];
  }
  return code;
}

export default function SignUp() {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('yourname@sparkus.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sCode, setSCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => { setSCode(generateRandomCode()); }, []);

  useEffect(() => {
    databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_LOGINPAGE_COLLECTION_ID
    ).then(r => setAccounts(r.documents)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allEmails = accounts.map(a => a.Email);
    if (allEmails.includes(email)) { setErrMsg('This email already exists!'); return; }
    if (password !== confirmPassword) { setErrMsg("Passwords don't match!"); return; }
    if (password.length > 10) { setErrMsg('Password must be ≤ 10 characters.'); return; }
    setStatus('loading');
    setErrMsg('');
    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_LOGINPAGE_COLLECTION_ID,
        ID.unique(),
        { Name: name, Email: email, Password: password, SCode: sCode, PhoneNo: phoneNo, DateOfBirth: dateOfBirth, PremiemAccount: 'No' }
      );
      localStorage.setItem('Login', 'true');
      localStorage.setItem('Email', email);
      localStorage.setItem('Password', password);
      localStorage.setItem('OSActivated', 'true');
      setStatus('done');
      setTimeout(() => router.push('/lumina-os'), 1500);
    } catch (err) {
      console.error(err);
      setErrMsg('An error occurred. Please try again.');
      setStatus('idle');
    }
  };

  const handleChange = (e) => {
    const { name: n, value } = e.target;
    if (n === 'name') { setName(value); setEmail(`${value.replace(/\s/g, '').toLowerCase()}@sparkus.com`); }
    else if (n === 'email') setEmail(value.toLowerCase());
    else if (n === 'password') setPassword(value);
    else if (n === 'confirmPassword') setConfirmPassword(value);
    else if (n === 'phoneNo') setPhoneNo(value);
    else if (n === 'dateofbirth') setDateOfBirth(value);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
    padding: '14px 18px', color: '#f1f5f9', fontSize: '15px',
    outline: 'none', fontFamily: "'Inter', sans-serif",
    marginBottom: '12px', boxSizing: 'border-box', transition: 'border-color 0.2s',
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #0f172a 0%, #020617 60%, #000000 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', sans-serif", color: '#f8fafc', padding: '40px 20px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '480px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '24px', padding: '48px 40px',
        backdropFilter: 'blur(16px)',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block',
          background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '50px', padding: '5px 14px',
          fontSize: '11px', fontWeight: '700', color: '#34d399',
          letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px',
        }}>
          ✨ CREATE ACCOUNT
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '6px' }}>
          Join LuminaOS
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
          Create your RK AI account and boot into your personal OS.
        </p>

        {status === 'done' ? (
          <div style={{
            textAlign: 'center', padding: '40px 20px',
            background: 'rgba(16,185,129,0.08)', borderRadius: '16px',
            border: '1px solid rgba(16,185,129,0.2)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚀</div>
            <h3 style={{ color: '#34d399', fontWeight: '800', marginBottom: '8px' }}>Account Created!</h3>
            <p style={{ color: '#64748b', fontSize: '14px' }}>Launching LuminaOS...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} onChange={handleChange}
              style={inputStyle} placeholder="Your name" required />
            <input type="email" name="email" value={email} onChange={handleChange}
              style={inputStyle} placeholder="Your email" autoComplete="off" required />
            <input type="password" name="password" value={password} onChange={handleChange}
              style={inputStyle} placeholder="Password (max 10 chars)" autoComplete="off" required />
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleChange}
              style={inputStyle} placeholder="Confirm password" required />
            <input type="date" name="dateofbirth" value={dateOfBirth} onChange={handleChange}
              style={inputStyle} required />
            <input type="number" name="phoneNo" value={phoneNo} onChange={handleChange}
              style={inputStyle} placeholder="Phone number" required />

            {errMsg && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '10px', padding: '10px 14px', marginBottom: '14px',
                color: '#f87171', fontSize: '13px',
              }}>{errMsg}</div>
            )}

            <button type="submit" disabled={status === 'loading'} style={{
              width: '100%',
              background: status === 'loading'
                ? 'rgba(16,185,129,0.4)'
                : 'linear-gradient(135deg, #10b981, #3b82f6)',
              border: 'none', borderRadius: '12px', padding: '16px',
              color: '#fff', fontSize: '15px', fontWeight: '700',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              fontFamily: "'Inter', sans-serif",
            }}>
              {status === 'loading' ? 'Creating account...' : 'Create Account →'}
            </button>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#64748b', fontSize: '13px' }}>
              Already have an account?{' '}
              <Link href="/lumina-os" style={{ color: '#60a5fa', fontWeight: '600' }}>Login via OS</Link>
            </p>
          </form>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap'); input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }`}</style>
    </main>
  );
}