import "./globals.scss";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  icons: {
    icon: '/Header/soundLogo.svg', 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}