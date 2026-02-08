import { AuthProvider } from '@/context/authContext';
import './globals.css';

export const metadata = {
  title: 'Tunno',
  description: 'Site educacional',
};


export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}
