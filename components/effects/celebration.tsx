"use client";

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  isVisible: boolean;
  type: 'fireworks' | 'confetti';
  onComplete: () => void;
}

export function Celebration({ isVisible, type, onComplete }: CelebrationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    // 移除可能存在的旧 canvas
    if (canvasRef.current) {
      document.body.removeChild(canvasRef.current);
      canvasRef.current = null;
    }

    // 创建新的 canvas 元素
    const canvas = document.createElement('canvas');
    
    // 设置样式确保 canvas 总是在最顶层
    canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999999;
      isolation: isolate;
    `;

    // 设置 canvas 尺寸
    const setCanvasSize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // 将 canvas 添加到 body 的最后
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    // 创建 confetti 实例
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    // 根据类型执行不同的动画
    if (type === 'fireworks') {
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        particleCount: 150,
        spread: 360,
        startVelocity: 60,
        ticks: 300,
        zIndex: 9999999,
        shapes: ['star', 'circle'],
        colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee'],
        scalar: 2.5,
        disableForReducedMotion: true
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          onComplete();
          return;
        }

        // 从底部发射
        myConfetti({
          ...defaults,
          origin: { x: 0.5, y: 1 },
          gravity: 1.5
        });

        // 从两侧发射
        myConfetti({
          ...defaults,
          origin: { x: 0.2, y: 1 },
          angle: 60
        });

        myConfetti({
          ...defaults,
          origin: { x: 0.8, y: 1 },
          angle: 120
        });
      }, 100);

      return () => {
        clearInterval(interval);
        if (canvasRef.current) {
          document.body.removeChild(canvasRef.current);
          canvasRef.current = null;
        }
        window.removeEventListener('resize', setCanvasSize);
      };
    } else {
      // 礼炮效果
      const defaults = {
        particleCount: 200,
        spread: 100,
        startVelocity: 45,
        gravity: 1.2,
        ticks: 500,
        zIndex: 9999999,
        colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee'],
        shapes: ['square', 'circle'],
        scalar: 1.2,
        disableForReducedMotion: true
      };

      // 从左右两侧发射
      myConfetti({
        ...defaults,
        origin: { x: 0, y: 0.9 },
        angle: 60
      });

      myConfetti({
        ...defaults,
        origin: { x: 1, y: 0.9 },
        angle: 120
      });

      // 中央爆发
      setTimeout(() => {
        myConfetti({
          ...defaults,
          origin: { x: 0.5, y: 0.5 },
          spread: 360,
          startVelocity: 50,
          scalar: 1.5
        });

        setTimeout(onComplete, 1000);
      }, 250);

      return () => {
        if (canvasRef.current) {
          document.body.removeChild(canvasRef.current);
          canvasRef.current = null;
        }
        window.removeEventListener('resize', setCanvasSize);
      };
    }
  }, [isVisible, type, onComplete]);

  return null;
} 