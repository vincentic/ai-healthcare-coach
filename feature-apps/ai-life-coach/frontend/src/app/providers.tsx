'use client';

import { useEffect } from 'react';
import { App as AntApp, ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { setMessageApi } from '../utils/message';

function MessageBridge({ children }: { children: React.ReactNode }) {
  const { message } = AntApp.useApp();

  useEffect(() => {
    setMessageApi(message);
  }, [message]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1976d2',
          borderRadius: 8,
          borderRadiusLG: 10,
          colorText: '#172033',
          colorTextSecondary: '#566274',
          colorBorder: '#dfe6ef',
          colorBgLayout: '#f5f7fb',
          colorBgContainer: '#ffffff',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Button: {
            controlHeight: 36,
            borderRadius: 8,
          },
          Card: {
            borderRadiusLG: 10,
          },
          Table: {
            headerBg: '#eef3f8',
            headerColor: '#566274',
            rowHoverBg: '#eef5ff',
          },
        },
      }}
    >
      <AntApp>
        <MessageBridge>{children}</MessageBridge>
      </AntApp>
    </ConfigProvider>
  );
}
