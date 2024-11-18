"use client";

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// 修改类型声明
declare module 'canvas-confetti' {
  type Shape = 'square' | 'circle' | 'star';

  interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: Shape[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  interface ConfettiFunction {
    (options?: Options): Promise<null>;
    create(canvas: HTMLCanvasElement, options?: { resize?: boolean; useWorker?: boolean }): (options?: Options) => void;
  }
}

// 为导入的 confetti 添加类型
const confettiWithTypes = confetti as unknown as {
  (options?: confetti.Options): Promise<null>;
  create(canvas: HTMLCanvasElement, options?: { resize?: boolean; useWorker?: boolean }): (options?: confetti.Options) => void;
};

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

    // 创建 confetti 实例，使用类型转换后的 confetti
    const myConfetti = confettiWithTypes.create(canvas, {
      resize: true,
      useWorker: true
    });

    // 根据类型执行不同的动画
    if (type === 'fireworks') {
      const duration = 2000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        particleCount: 50,
        spread: 180,
        startVelocity: 45,
        ticks: 200,
        zIndex: 9999999,
        shapes: ['star', 'circle'] as ('star' | 'circle')[],
        colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee'],
        scalar: 1.5,
        disableForReducedMotion: true
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(interval);
          onComplete();
          return;
        }

        // 只从底部中心发射
        myConfetti({
          ...defaults,
          origin: { x: 0.5, y: 1 },
          gravity: 1.2
        });

        // 减少发射频率
      }, 200);

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
        particleCount: 80,
        spread: 60,
        startVelocity: 35,
        gravity: 1,
        ticks: 300,
        zIndex: 9999999,
        colors: ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#ee82ee'],
        shapes: ['square', 'circle'] as ('square' | 'circle')[],
        scalar: 0.8,
        disableForReducedMotion: true
      };

      // 从左右两侧发射
      myConfetti({
        ...defaults,
        origin: { x: 0.2, y: 0.9 },
        angle: 60
      });

      myConfetti({
        ...defaults,
        origin: { x: 0.8, y: 0.9 },
        angle: 120
      });

      // 中央爆发效果也减弱
      setTimeout(() => {
        myConfetti({
          ...defaults,
          origin: { x: 0.5, y: 0.5 },
          spread: 180,
          startVelocity: 35,
          scalar: 1
        });

        setTimeout(onComplete, 800);
      }, 200);

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