import './globals.css'

export const metadata = {
  title: 'Language Learning',
  description: 'Shadow reading language practice',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
