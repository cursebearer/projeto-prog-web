import '../styles/globals.scss'

export const metadata = {
  title: 'HealthEnv',
  description: 'Sua evolução, registrada.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
