import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "./contexts/auth-context"
import Footer from "./components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ClimateRisks - Sistema de Gestão de Riscos Climáticos",
  description: "Monitore, previna e responda a eventos climáticos extremos",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <AuthProvider>
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
