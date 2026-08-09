'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from '../lib/navigation';
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  CompassOutlined,
  FireOutlined,
  FolderOpenOutlined,
  BulbOutlined,
  MoonOutlined,
  RocketOutlined,
  SunOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const TaijiIcon = () => (
  <img src="/taiji-icon.png" alt="五维" className="brand-mark" />
);

const menuItems = [
  { key: '/', icon: <FireOutlined />, label: '驱动力', desc: '自主 / 快乐 / 平静' },
  { key: '/mind', icon: <CompassOutlined />, label: '价值与自由', desc: '方向 / 五种自由' },
  { key: '/health', icon: <AppstoreOutlined />, label: '目标与责任领域', desc: '健康 / 关系 / 财务' },
  { key: '/work-logs', icon: <FolderOpenOutlined />, label: '项目与看板', desc: '阶段成果 / 完成标准' },
  { key: '/time', icon: <ClockCircleOutlined />, label: '清单日历状态', desc: '下一步 / 时间块' },
  { key: '/books', icon: <RocketOutlined />, label: '内容应用与作品', desc: '知识 / 输出 / 资产' },
  { key: '/daily-reviews', icon: <SyncOutlined />, label: '复盘与个人规律', desc: '发生 / 发现 / 调整' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const activeItem = useMemo(
    () => menuItems.find((item) => (item.key === '/' ? pathname === '/' : pathname.startsWith(item.key))) ?? menuItems[0],
    [pathname],
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="logo-icon">
              <TaijiIcon />
            </span>
            <div>
              <div className="logo-text">AI Life Coach</div>
              <div className="logo-subtitle">层级执行系统</div>
            </div>
          </div>
        </div>

        <nav className="nav-items" aria-label="主导航">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.key}
              className={`nav-item ${(item.key === '/' ? pathname === '/' : pathname.startsWith(item.key)) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">
                <span className="nav-label">{item.label}</span>
                <span className="nav-desc">{item.desc}</span>
              </span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            className="theme-toggle"
            type="button"
            title={themeMode === 'dark' ? '切换白天模式' : '切换夜间模式'}
            onClick={() => setThemeMode((mode) => (mode === 'dark' ? 'light' : 'dark'))}
          >
            {themeMode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
          </button>
          <div className="version-info">v1.0.0</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="page-shell-header">
          <div>
            <p className="page-kicker"><BulbOutlined /> Personal Operating System</p>
            <h1>{activeItem.label}</h1>
          </div>
          <div className="page-status">
            <span className="status-dot" />
            今日可复盘
          </div>
        </header>

        <section className="content-panel">
          {children}
        </section>
      </main>
    </div>
  );
}
