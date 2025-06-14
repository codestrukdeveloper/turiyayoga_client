'use client';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BootstrapInit() {
  useEffect(() => {
    typeof document !== 'undefined' && require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}