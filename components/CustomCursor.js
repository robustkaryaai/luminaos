// components/CustomCursor.js
'use client'
import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState('pointer');

  const updateCursorPosition = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateCursorPosition);
    const handleOver = (e) => {
      const t = e.target;
      if (!t) return;
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) {
        setMode('text');
      } else if (window.getSelection && window.getSelection().type === 'Range') {
        setMode('text');
      } else {
        setMode('pointer');
      }
    };
    document.addEventListener('mouseover', handleOver);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleOver);
    };
  }, []);

  return (
    <div
      className={`${styles.cursor} ${mode === 'text' ? styles.text : styles.pointer}`}
      style={{ left: cursorPosition.x, top: cursorPosition.y }}
    />
  );
};

export default CustomCursor;
