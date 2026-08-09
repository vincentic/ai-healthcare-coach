import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Care Coach | 身心整合疗愈导航',
  description: '整合西医、中医、护理、心理疗愈、戏剧疗愈、艺术疗愈与费登奎斯的实践地图。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
