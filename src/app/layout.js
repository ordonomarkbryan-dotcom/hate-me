import './globals.css';

export const metadata = {
  title: 'Our Memories',
  description: 'A space for the memories we shared, the words we never said, and the feelings that remain.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">♥</text></svg>',
  },
  openGraph: {
    title: 'Our Memories',
    description: 'Some memories never really leave us...',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0C1445',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
