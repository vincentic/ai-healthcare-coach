import type { Metadata } from 'next';
import 'antd/dist/reset.css';
import '../index.css';
import { AppProviders } from './providers';
import { Layout } from '../components/Layout';

export const metadata: Metadata = {
  title: 'Life Consistency Coach',
  description: 'Personal operating system for knowledge, health, time, money, work, and relationships.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
}
