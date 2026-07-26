export const metadata = {
  title: 'Free AI Video Generator',
  description: 'Generate high-quality AI videos for free',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
