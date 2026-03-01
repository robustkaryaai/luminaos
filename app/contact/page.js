'use client';

import { useEffect, useState } from 'react'
import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | done | error

    useEffect(() => {
        const localEmail = localStorage.getItem('Email');
        if (localEmail) setEmail(localEmail);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_APPWRITE_COUNTACTPAGE_COLLECTION_ID,
                ID.unique(),
                { Name: name, Email: email, Message: message }
            );
            setName('');
            setMessage('');
            setStatus('done');
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name: n, value } = e.target;
        if (n === 'name') setName(value);
        else if (n === 'email') setEmail(value);
        else if (n === 'message') setMessage(value);
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '14px 18px',
        color: '#f1f5f9',
        fontSize: '15px',
        outline: 'none',
        fontFamily: "'Inter', sans-serif",
        marginBottom: '14px',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s',
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
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                width: '100%', maxWidth: '500px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px', padding: '48px 40px',
                backdropFilter: 'blur(16px)',
            }}>
                {/* Badge */}
                <div style={{
                    display: 'inline-block',
                    background: 'rgba(6,182,212,0.12)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    borderRadius: '50px', padding: '5px 14px',
                    fontSize: '11px', fontWeight: '700', color: '#22d3ee',
                    letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px',
                }}>
                    💬 CONTACT US
                </div>

                <h1 style={{
                    fontSize: '28px', fontWeight: '900', letterSpacing: '-1px',
                    marginBottom: '8px', color: '#f1f5f9',
                }}>Get in touch</h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px', lineHeight: 1.6 }}>
                    Have a question or feedback? The Rexycore team is here to help.
                </p>

                {status === 'done' ? (
                    <div style={{
                        textAlign: 'center', padding: '40px 20px',
                        background: 'rgba(167,139,250,0.08)', borderRadius: '16px',
                        border: '1px solid rgba(167,139,250,0.2)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                        <h3 style={{ color: '#34d399', fontWeight: '800', marginBottom: '8px' }}>Message Sent!</h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" value={name} onChange={handleChange}
                            style={inputStyle} placeholder="Your name" required />
                        <input type="email" name="email" value={email} onChange={handleChange}
                            style={inputStyle} placeholder="Your email" required />
                        <textarea name="message" value={message} onChange={handleChange}
                            style={{ ...inputStyle, height: '120px', resize: 'vertical' }}
                            placeholder="Your message..." required />
                        <button type="submit" disabled={status === 'sending'} style={{
                            width: '100%',
                            background: status === 'sending'
                                ? 'rgba(6,182,212,0.4)'
                                : 'linear-gradient(135deg, #9b59f5, #9b59f5)',
                            border: 'none', borderRadius: '12px',
                            padding: '15px', color: '#fff', fontSize: '15px',
                            fontWeight: '700', cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'opacity 0.2s',
                        }}>
                            {status === 'sending' ? 'Sending...' : 'Send Message →'}
                        </button>
                        {status === 'error' && (
                            <p style={{ color: '#f87171', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
                                Failed to send. Please try again.
                            </p>
                        )}
                    </form>
                )}
            </div>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');`}</style>
        </main>
    );
}
