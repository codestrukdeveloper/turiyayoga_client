'use client'
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AosInit() {
  useEffect(() => {
    const AOS = require('aos'); // ✅ JS fallback
    AOS.init({ duration: 1000 });
  }, []);

  return null;
}
