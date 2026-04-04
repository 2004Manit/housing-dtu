import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from '@/lib/supabase';

/* ================================================================== */
/*  All CSS as a template literal injected via <style>                 */
/* ================================================================== */
const PAGE_STYLES = `
/* ── Google Fonts ─────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

/* ── Keyframes ────────────────────────────────────────────────────── */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes gradientShift {
  0%   { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(15deg); }
}
@keyframes compassSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes borderShimmer {
  0%, 100% { border-color: rgba(255,255,255,0.08); }
  50%      { border-color: rgba(255,255,255,0.22); }
}
@keyframes formFadeOut {
  from { opacity:1; }
  to   { opacity:0; height:0; margin:0; padding:0; overflow:hidden; }
}
@keyframes successFadeIn {
  from { opacity:0; transform:translateY(12px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes checkDraw {
  to { stroke-dashoffset: 0; }
}
@keyframes matrixFade {
  0%, 100% { opacity: 0.03; }
  50%      { opacity: 0.07; }
}
@keyframes terminalIn {
  from { opacity: 0; transform: translateX(-50%) translateY(-50%) scale(0.96); }
  to   { opacity: 1; transform: translateX(-50%) translateY(-50%) scale(1); }
}
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
@keyframes termScroll {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.3; }
}

/* ── Reset & Box Sizing ───────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
}

/* ── Page shell ───────────────────────────────────────────────────── */
.compass-page {
  position: fixed;
  inset: 0;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  background: #1a1b1e;
  display: flex;
  flex-direction: row;
}

/* ── Scattered code/matrix background texture ─────────────────────── */
.compass-matrix {
  position: absolute; inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  animation: matrixFade 8s ease-in-out infinite;
}
.compass-matrix span {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: rgba(255,255,255,0.06);
  user-select: none;
  white-space: nowrap;
}

/* ================================================================== */
/*  LEFT PANEL                                                          */
/* ================================================================== */
.compass-left {
  position: relative; z-index: 2;
  flex: 1; min-width: 0;
  display: flex; flex-direction: column;
  padding: 40px 56px;
  overflow-y: auto;
}

/* ── Logo ─────────────────────────────────────────────────────────── */
.compass-logo {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 0;
}
.compass-logo svg.compass-icon {
  animation: compassSpin 12s linear infinite;
  will-change: transform;
}
.compass-logo-text {
  font-family: 'Inter', sans-serif;
  font-size: 26px; font-weight: 700;
  color: #e8e8e8;
  letter-spacing: -0.01em;
}

/* ── Left content group ───────────────────────────────────────────── */
.compass-left-content {
  flex: 1;
  display: flex; flex-direction: column;
  justify-content: center;
  max-width: 480px;
}

/* ── Early access badge ───────────────────────────────────────────── */
.compass-early-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(240,165,0,0.12);
  border: 1px solid rgba(240,165,0,0.25);
  border-radius: 50px;
  padding: 6px 16px;
  margin-bottom: 28px;
  width: fit-content;
}
.compass-early-badge .dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #F0A500;
}
.compass-early-badge span {
  font-family: 'Inter', sans-serif;
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F0A500;
}

/* ── Headline ─────────────────────────────────────────────────────── */
.compass-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(34px, 4.2vw, 56px);
  font-weight: 700;
  color: #f0f0e8;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
}
.compass-headline em {
  font-style: normal;
  color: #00C9A7;
}

/* ── Subheadline ──────────────────────────────────────────────────── */
.compass-sub {
  font-family: 'Inter', sans-serif;
  font-size: 16px; font-weight: 400;
  color: #8a8a7e;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 400px;
}

/* ── Form ─────────────────────────────────────────────────────────── */
.compass-form {
  display: flex; gap: 0;
  width: 100%; max-width: 440px;
}
.compass-form.hiding {
  animation: formFadeOut 0.4s ease forwards;
}
.compass-input {
  flex: 1;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 50px 0 0 50px;
  padding: 15px 24px;
  font-family: 'Inter', sans-serif; font-size: 15px; color: #e0e0d8;
  outline: none;
  transition: box-shadow 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
  min-width: 0;
}
.compass-input::placeholder { color: #5a5a52; }
.compass-input:focus {
  box-shadow: 0 0 0 3px rgba(240,165,0,0.2);
  padding: 15px 28px;
  border-color: rgba(240,165,0,0.35);
}
.compass-btn {
  background: #F0A500; color: #fff; border: none;
  border-radius: 0 50px 50px 0;
  padding: 15px 28px;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(240,165,0,0.3);
  transition: background 0.25s, transform 0.25s, box-shadow 0.25s;
  white-space: nowrap;
  flex-shrink: 0;
}
.compass-btn:hover {
  background: #D4920A;
  transform: scale(1.03);
  box-shadow: 0 6px 28px rgba(240,165,0,0.45);
}
.compass-btn:active { transform: scale(0.97); }

/* ── Success state ────────────────────────────────────────────────── */
.compass-success {
  display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
  animation: successFadeIn 0.5s ease-out both;
}
.compass-success-check {
  width: 44px; height: 44px;
}
.compass-success-check path {
  stroke-dasharray: 80;
  stroke-dashoffset: 80;
  animation: checkDraw 0.6s ease-out 0.1s forwards;
}
.compass-success-msg {
  font-family: 'Inter', sans-serif;
  font-size: 16px; font-weight: 400; color: #c0c0b0;
}

/* ── Inline footer (below form) ───────────────────────────────────── */
.compass-footer-inline {
  margin-top: 16px;
}
.compass-footer-inline p {
  font-family: 'Inter', sans-serif;
  font-size: 12px; color: #4a4a44;
  line-height: 1.6;
}
.compass-footer-inline a {
  color: #7a7a6e; text-decoration: underline;
  text-underline-offset: 2px;
  transition: color 0.2s;
}
.compass-footer-inline a:hover { color: #F0A500; }

/* ── Back link (fixed bottom center, all screens) ─────────────────── */
.compass-back-link {
  position: fixed;
  bottom: 14px;
  left: 25%;
  transform: translateX(-50%);
  z-index: 50;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #4a4a44;
  text-decoration: none;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: color 0.2s;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}
.compass-back-link:hover { color: #6a6a5e; }

@media (max-width: 900px) {
  .compass-back-link {
    position: static;
    display: block;
    text-align: center;
    margin: 12px auto 32px;
    left: unset;
    transform: none;
  }
}

/* ================================================================== */
/*  RIGHT PANEL                                                         */
/* ================================================================== */
.compass-right {
  position: relative; z-index: 2;
  flex: 1.15; min-width: 0;
  display: flex; align-items: center; justify-content: center;
  padding: 28px 32px 28px 0;
}

.compass-card {
  position: relative;
  width: 100%; height: calc(100vh - 56px);
  background: #0a1628;
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 24px;
  box-shadow: 0 12px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset;
  overflow: hidden;
  display: flex; flex-direction: column;
  animation: slideInRight 1s ease-out 0.4s both, borderShimmer 4s ease-in-out infinite;
}
.compass-card::after {
  content: '';
  position: absolute; inset: 0;
  border-radius: 24px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
  pointer-events: none; z-index: 10;
}

/* ── Gradient Background ──────────────────────────────────────────── */
.compass-gradient-bg {
  position: absolute; inset: 0;
  border-radius: 24px;
  overflow: hidden;
}
.compass-gradient-bg canvas {
  width: 100%; height: 100%;
  display: block;
}

/* ── Celebration canvas ───────────────────────────────────────────── */
.compass-celebration {
  position: fixed; inset: 0;
  z-index: 100;
  pointer-events: none;
}

/* ================================================================== */
/*  TERMINAL BOX                                                        */
/* ================================================================== */
.compass-terminal {
  position: absolute;
  top: 50%; left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 82%; height: 44%;
  z-index: 10;
  border-radius: 12px;
  animation: terminalIn 0.7s ease-out 0.5s both;
}
.compass-terminal-frame {
  width: 100%; height: 100%;
  background: rgba(15,15,15,0.92);
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  box-shadow:
    0 4px 6px rgba(0,0,0,0.1),
    0 20px 40px rgba(0,0,0,0.35),
    0 0 0 1px rgba(255,255,255,0.06);
  display: flex; flex-direction: column;
  overflow: hidden;
  position: relative;
}
.compass-terminal-reflection {
  position: absolute;
  bottom: -8px; left: 0;
  width: 100%; height: 8px;
  background: linear-gradient(to bottom, rgba(17,17,17,0.3), transparent);
  border-radius: 0 0 8px 8px;
  pointer-events: none;
}

/* Top bar */
.compass-term-topbar {
  height: 30px; min-height: 30px;
  background: rgba(30,30,30,0.95);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px 12px 0 0;
  display: flex; align-items: center;
  position: relative;
}
.compass-term-dots {
  display: flex; gap: 6px; margin-left: 12px;
}
.compass-term-dots span {
  width: 8px; height: 8px; border-radius: 50%;
}
.compass-term-dots span:nth-child(1) { background: #FF5F57; }
.compass-term-dots span:nth-child(2) { background: #FFBD2E; }
.compass-term-dots span:nth-child(3) { background: #28C840; }
.compass-term-title {
  position: absolute; left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: rgba(255,255,255,0.3);
  white-space: nowrap;
}

/* Screen body */
.compass-term-body {
  flex: 1; min-height: 0;
  background: rgba(10,10,10,0.90);
  padding: 10px 14px 0 14px;
  overflow: hidden;
  border-radius: 0 0 12px 12px;
  position: relative;
  display: flex; flex-direction: column;
}
.compass-term-body::before {
  content: '';
  position: absolute; inset: 0;
  pointer-events: none; z-index: 2;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px, transparent 2px,
    rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px
  );
}
.compass-term-fade-top {
  position: absolute; top: 0; left: 0; right: 0;
  height: 28px;
  background: linear-gradient(to bottom, rgba(10,10,10,0.90), transparent);
  z-index: 3; pointer-events: none;
}
.compass-term-fade-bottom {
  position: absolute; bottom: 22px; left: 0; right: 0;
  height: 32px;
  background: linear-gradient(to top, rgba(10,10,10,0.90), transparent);
  z-index: 3; pointer-events: none;
}

/* Typing header */
.compass-term-typing {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: #22C55E;
  line-height: 1.8;
  flex-shrink: 0;
  min-height: 0;
}
.compass-term-typing .cursor {
  animation: cursorBlink 0.8s infinite;
}
.compass-term-typing .divider {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  margin: 6px 0 8px 0;
}

/* Scrolling feature list */
.compass-term-features-wrap {
  flex: 1; min-height: 0;
  overflow: hidden;
  position: relative;
}
.compass-term-features {
  animation: termScroll 22s linear infinite;
}
.compass-terminal-frame:hover .compass-term-features {
  animation-play-state: paused;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.compass-term-item {
  display: flex; gap: 10px; align-items: flex-start;
  padding-bottom: 13px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  margin-bottom: 3px;
}
.compass-term-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22C55E;
  box-shadow: 0 0 5px rgba(34,197,94,0.65);
  margin-top: 3px;
  flex-shrink: 0;
}
.compass-term-item-text {
  display: flex; flex-direction: column;
}
.compass-term-item-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11.5px; font-weight: 500;
  color: #E2E8F0; line-height: 1.4;
}
.compass-term-item-desc {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 400;
  color: rgba(255,255,255,0.28);
  margin-top: 2px;
}

/* Status bar */
.compass-term-status {
  height: 22px; min-height: 22px;
  background: rgba(8,8,8,0.95);
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 12px;
  position: relative; z-index: 4;
}
.compass-term-status-left {
  display: flex; align-items: center; gap: 6px;
}
.compass-term-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%; background: #22C55E;
  animation: statusPulse 1.8s ease-in-out infinite;
}
.compass-term-status-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; color: rgba(255,255,255,0.22);
}
.compass-term-status-ver {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; color: rgba(255,255,255,0.15);
}

/* ── Reduced motion ───────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .compass-card { animation: fadeIn 0.5s ease-out both !important; }
  .compass-term-features { animation: none !important; }
}

/* ================================================================== */
/*  RESPONSIVE — Tablet (max-width: 900px)                             */
/* ================================================================== */
@media (max-width: 900px) {
  .compass-page {
    position: relative;
    inset: unset;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;
    min-height: 100vh;
    height: auto;
  }

  .compass-left {
    flex: none;
    width: 100%;
    padding: 36px 36px 32px;
    overflow-y: visible;
    min-height: auto;
  }
    

  .compass-left-content {
    max-width: 100%;
    justify-content: flex-start;
    padding-top: 24px;
  }

  .compass-early-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(240,165,0,0.12);
  border: 1px solid rgba(240,165,0,0.25);
  border-radius: 50px;
  padding: 6px 16px;
  margin-bottom: 20px;
  margin-top: 30px;
  width: fit-content;
}
  .compass-footer-inline {
  margin-top: 16px;
  margin-bottom: 24px;
}

  .compass-headline { font-size: clamp(30px, 6vw, 46px); }
  .compass-sub { max-width: 100%; }
  .compass-form { max-width: 100%; }

  .compass-right {
    flex: none;
    width: 100%;
    height: auto;
    padding: 0 28px 64px;
    align-items: stretch;
    justify-content: center;
  }

  .compass-card {
    width: 100%;
    height: 520px;
    animation: slideUp 1s ease-out 0.4s both, borderShimmer 4s ease-in-out infinite;
  }

  .compass-terminal {
    width: 86%;
    height: 46%;
    top: 50%;
  }

  .compass-term-item-name { font-size: 11px; }
  .compass-term-item-desc { font-size: 9.5px; }
}

/* ================================================================== */
/*  RESPONSIVE — Mobile (max-width: 560px)                             */
/* ================================================================== */
@media (max-width: 560px) {
  .compass-left { padding: 24px 20px 20px; }
  .compass-left-content { padding-top: 20px; }
  .compass-logo-text { font-size: 22px; }
  .compass-headline { font-size: clamp(26px, 7.5vw, 36px); }
  .compass-sub { font-size: 15px; }

  .compass-form {
    flex-direction: column;
    gap: 12px;
    max-width: 100%;
  }
  .compass-input { border-radius: 50px; width: 100%; }
  .compass-btn { border-radius: 50px; width: 100%; text-align: center; }

  .compass-right { padding: 0 16px 56px; }

  .compass-card {
    height: 440px;
    border-radius: 18px;
  }

  .compass-terminal {
    width: 90%;
    height: 48%;
    top: 48%;
  }

  .compass-term-item-name { font-size: 10px; }
  .compass-term-item-desc { font-size: 9px; }
  .compass-term-title { font-size: 9px; }
  .compass-matrix span { font-size: 11px; }
}

/* ================================================================== */
/*  RESPONSIVE — Very small phones (max-width: 380px)                  */
/* ================================================================== */
@media (max-width: 380px) {
  .compass-left { padding: 20px 16px 16px; }
  .compass-headline { font-size: clamp(22px, 8vw, 30px); }
  .compass-card { height: 400px; }
  .compass-terminal { width: 92%; height: 50%; }
  .compass-term-item-name { font-size: 9.5px; }
  .compass-term-item-desc { font-size: 8.5px; }
}

/* ================================================================== */
/*  RESPONSIVE — Large screens (min-width: 1400px)                     */
/* ================================================================== */
@media (min-width: 1400px) {
  .compass-left { padding: 48px 72px; }
  .compass-right { padding: 36px 44px 36px 0; }
  .compass-headline { font-size: clamp(42px, 3.5vw, 64px); }
}
`;

/* ================================================================== */
/*  Scattered background characters                                     */
/* ================================================================== */
const MATRIX_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*←→↑↓∆∇≈≠∫Σ";
const matrixItems: { char: string; x: number; y: number; rot: number }[] = [];
for (let i = 0; i < 80; i++) {
  matrixItems.push({
    char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
    x: Math.random() * 100,
    y: Math.random() * 100,
    rot: Math.random() * 40 - 20,
  });
}

/* ================================================================== */
/*  Interactive Gradient Blobs Background                               */
/* ================================================================== */
interface Blob {
  x: number; y: number; vx: number; vy: number;
  r: number; color: string; phase: number; speed: number;
}

const BLOB_COLORS = [
  'rgba(30, 120, 220, 0.55)',
  'rgba(60, 160, 255, 0.45)',
  'rgba(100, 200, 255, 0.40)',
  'rgba(200, 230, 255, 0.50)',
  'rgba(255, 255, 255, 0.35)',
  'rgba(10, 80, 180, 0.50)',
  'rgba(140, 210, 255, 0.38)',
];

const GradientBlobs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const blobsRef = useRef<Blob[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blobs: Blob[] = [];
    for (let i = 0; i < 7; i++) {
      blobs.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        r: 0.18 + Math.random() * 0.22,
        color: BLOB_COLORS[i % BLOB_COLORS.length],
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      });
    }
    blobsRef.current = blobs;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      time += 0.008;

      ctx.fillStyle = '#0a1628';
      ctx.fillRect(0, 0, w, h);

      const mouse = mouseRef.current;

      for (const blob of blobs) {
        blob.x += blob.vx + Math.sin(time * blob.speed + blob.phase) * 0.001;
        blob.y += blob.vy + Math.cos(time * blob.speed * 0.8 + blob.phase) * 0.001;

        if (mouse.active) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0.01) {
            blob.x += dx * 0.008;
            blob.y += dy * 0.008;
          }
        }

        if (blob.x < -0.1 || blob.x > 1.1) blob.vx *= -1;
        if (blob.y < -0.1 || blob.y > 1.1) blob.vy *= -1;
        blob.x = Math.max(-0.15, Math.min(1.15, blob.x));
        blob.y = Math.max(-0.15, Math.min(1.15, blob.y));

        const pulseR = blob.r + Math.sin(time * 1.5 + blob.phase) * 0.03;
        const px = blob.x * w;
        const py = blob.y * h;
        const pr = pulseR * Math.max(w, h);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace(/[\d.]+\)$/, (parseFloat(blob.color.match(/[\d.]+\)$/)?.[0] || '0.4') * 0.5).toFixed(2) + ')'));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.globalCompositeOperation = 'lighter';
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { ...mouseRef.current, active: false };
  }, []);

  return (
    <div
      className="compass-gradient-bg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

/* ================================================================== */
/*  Compass Icon SVG                                                    */
/* ================================================================== */
const CompassIcon = () => (
  <svg className="compass-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="chromeRing" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e8e8ee" />
        <stop offset="25%" stopColor="#f5f5f8" />
        <stop offset="45%" stopColor="#ffffff" />
        <stop offset="55%" stopColor="#c0c0cc" />
        <stop offset="75%" stopColor="#9a9aaa" />
        <stop offset="100%" stopColor="#d0d0da" />
      </linearGradient>
      <linearGradient id="chromeDiamond" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f0f0f5" />
        <stop offset="40%" stopColor="#ffffff" />
        <stop offset="60%" stopColor="#b8b8c8" />
        <stop offset="100%" stopColor="#d8d8e2" />
      </linearGradient>
      <linearGradient id="specular" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.6" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <filter id="iconGlow">
        <feDropShadow dx="0" dy="0.5" stdDeviation="0.6" floodColor="#ffffff" floodOpacity="0.15" />
      </filter>
    </defs>
    <circle cx="12" cy="12.3" r="10" stroke="#555566" strokeWidth="2.6" opacity="0.25" />
    <circle cx="12" cy="12" r="10" stroke="url(#chromeRing)" strokeWidth="2.2" filter="url(#iconGlow)" />
    <path d="M5 7.5 A8.5 8.5 0 0 1 19 7.5" stroke="url(#specular)" strokeWidth="1.2" fill="none" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88" fill="url(#chromeDiamond)" stroke="url(#chromeRing)" strokeWidth="1.8" />
  </svg>
);

/* ================================================================== */
/*  Terminal Box Component                                              */
/* ================================================================== */
const FEATURES = [
  { name: "AI Cover Letter Generator", desc: "→ tailored to resume + JD in seconds" },
  { name: "Job Fit Score", desc: "→ match % with full skill gap breakdown" },
  { name: "Cold Email — HR Version", desc: "→ formal qualification-focused outreach" },
  { name: "Cold Email — Founder Version", desc: "→ vision-aligned casual direct pitch" },
  { name: "LinkedIn DM Generator", desc: "→ personalized connection message" },
  { name: "Resume Improvement Tips", desc: "→ ATS keyword suggestions by section" },
  { name: "AI Mock Interview", desc: "→ adaptive questions from resume + JD" },
  { name: "Interview Performance Report", desc: "→ scored feedback + better answer tips" },
];

const TerminalBox = () => {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [typingDone, setTypingDone] = useState(false);

  const LINE1_FULL = "> Initializing Compass AI...";
  const LINE2_FULL = "> All systems ready. ✓";

  useEffect(() => {
    let i = 0;
    let j = 0;
    const delay = setTimeout(() => {
      const t1 = setInterval(() => {
        i++;
        setLine1(LINE1_FULL.slice(0, i));
        if (i >= LINE1_FULL.length) {
          clearInterval(t1);
          const t2 = setInterval(() => {
            j++;
            setLine2(LINE2_FULL.slice(0, j));
            if (j >= LINE2_FULL.length) {
              clearInterval(t2);
              setShowCursor(true);
              setTypingDone(true);
            }
          }, 40);
        }
      }, 45);
    }, 800);
    return () => clearTimeout(delay);
  }, []);

  const featureItems = [...FEATURES, ...FEATURES];

  return (
    <div className="compass-terminal">
      <div className="compass-terminal-frame">
        <div className="compass-term-topbar">
          <div className="compass-term-dots">
            <span /><span /><span />
          </div>
          <span className="compass-term-title">compass-ai — features</span>
        </div>

        <div className="compass-term-body">
          <div className="compass-term-fade-top" />
          <div className="compass-term-fade-bottom" />

          <div className="compass-term-typing">
            <div>{line1}</div>
            {line2 && <div>{line2}{showCursor && <span className="cursor">|</span>}</div>}
            {typingDone && <div className="divider" />}
          </div>

          {typingDone && (
            <div className="compass-term-features-wrap">
              <div className="compass-term-features">
                {featureItems.map((f, i) => (
                  <div className="compass-term-item" key={i}>
                    <div className="compass-term-dot" />
                    <div className="compass-term-item-text">
                      <span className="compass-term-item-name">{f.name}</span>
                      <span className="compass-term-item-desc">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="compass-term-status">
            <div className="compass-term-status-left">
              <div className="compass-term-status-dot" />
              <span className="compass-term-status-text">8 features active</span>
            </div>
            <span className="compass-term-status-ver">v1.0.0</span>
          </div>
        </div>
      </div>
      <div className="compass-terminal-reflection" />
    </div>
  );
};

/* ================================================================== */
/*  Main Component                                                      */
/* ================================================================== */
const CompassAI = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formHiding, setFormHiding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const celebrationCanvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Parallax tilt — desktop only ──────────────────────────── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cardRef.current) return;
    if (window.innerWidth <= 900) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (window.innerWidth / 2)) * 2;
    const rotateX = ((centerY - e.clientY) / (window.innerHeight / 2)) * 2;
    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  /* ── Celebration burst ──────────────────────────────────────── */
  const fireCelebration = useCallback(() => {
    const canvas = celebrationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = "block";

    const cx = window.innerWidth <= 900 ? window.innerWidth / 2 : window.innerWidth * 0.25;
    const cy = window.innerHeight * 0.55;
    type P = { x: number; y: number; vx: number; vy: number; r: number; color: string; life: number };
    const ps: P[] = Array.from({ length: 24 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 2 + Math.random() * 3,
        color: ["#F0A500", "#FCD07A", "#E8C35A", "#facc15"][Math.floor(Math.random() * 4)],
        life: 1,
      };
    });
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      ps.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.06;
        p.life -= 0.013;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (alive) requestAnimationFrame(animate);
      else { canvas.style.display = "none"; }
    };
    animate();
  }, []);

  /* ── Form submit ────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const { error } = await supabase
      .from('compass_waitlist')
      .insert({ email: email.trim().toLowerCase() });

    if (error && error.code === '23505') {
      // duplicate email — still show success, don't alarm the user
    } else if (error) {
      console.error('Waitlist error:', error);
    }

    setFormHiding(true);
    setTimeout(() => {
      setSubmitted(true);
      fireCelebration();
    }, 400);
  };

  /* ── Go back (browser history) ──────────────────────────────── */
  const handleGoBack = useCallback(() => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'https://housingdtu.in';
    }
  }, []);

  return (
    <>
      <style>{PAGE_STYLES}</style>
      <div className="compass-page">

        <div className="compass-matrix">
          {matrixItems.map((item, i) => (
            <span
              key={i}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `rotate(${item.rot}deg)`,
              }}
            >
              {item.char}
            </span>
          ))}
        </div>

        <canvas ref={celebrationCanvasRef} className="compass-celebration" style={{ display: "none" }} />

        {/* ═══ LEFT PANEL ═══ */}
        <div className="compass-left">
          <div className="compass-logo">
            <CompassIcon />
            <span className="compass-logo-text">Compass AI</span>
          </div>

          <div className="compass-left-content">
            <div className="compass-early-badge">
              <div className="dot" />
              <span>Early Access</span>
            </div>

            <h1 className="compass-headline">
              Your AI-Powered<br />
              Job Application<br />
              <em>Co-Pilot</em>
            </h1>

            <p className="compass-sub">
              Subscribe to be the first to know when we launch and{" "}
              <span style={{
                background: "linear-gradient(to right, #D6C7FF, #AB8BFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>get free Compass AI pro credits</span>.
            </p>

            {!submitted ? (
              <form
                className={`compass-form${formHiding ? " hiding" : ""}`}
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  className="compass-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="compass-btn">
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="compass-success">
                <svg className="compass-success-check" viewBox="0 0 52 52">
                  <circle cx="26" cy="26" r="24" fill="none" stroke="#8a8a7a" strokeWidth="2" />
                  <path d="M14 27 L22 35 L38 18" fill="none" stroke="#F0A500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="compass-success-msg">
                  ✅ You're on the list! We'll be in touch.
                </p>
              </div>
            )}

            {/* ── Terms line — sits directly below form/success ── */}
            <div className="compass-footer-inline">
              <p>
                By subscribing, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </div>

          </div>
        </div>

        {/* ═══ RIGHT PANEL ═══ */}
        <div className="compass-right">
          <div className="compass-card" ref={cardRef}>
            <GradientBlobs />
            <TerminalBox />
          </div>
        </div>

        {/* ── Back to Housing DTU — fixed bottom center, all screens ── */}
        <button className="compass-back-link" onClick={handleGoBack}>
          ← Back to Housing DTU
        </button>

      </div>
    </>
  );
};

export default CompassAI;