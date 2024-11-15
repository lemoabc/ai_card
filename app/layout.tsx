/**
 * 应用程序根布局组件
 * 提供全局布局结构和主题支持
 */

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/animations.css'

// 配置 Inter 字体
const inter = Inter({ subsets: ['latin'] });

// 配置页面元数据
export const metadata: Metadata = {
  title: 'AI Chat Platform',
  description: 'A modern AI chat platform with multiple agents',
};

/**
 * 根布局组件
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
