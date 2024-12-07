import { AppSidebar } from "@/app/layout/AppSidebar"
import { AppTopbar } from "@/app/layout/AppTopbar"
import { AppContent } from "@/app/layout/AppContent"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Providers } from "@/components/Providers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Risk Management Dashboard",
  description: "Enterprise fraud detection and risk management platform for merchants",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} bg-indigo-50/30`}>
        <Providers>
          <div className="flex h-screen bg-gradient-to-br from-indigo-50/50 to-white">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <AppTopbar />
              <AppContent>
                <div className="p-6 h-full">
                  {children}
                </div>
              </AppContent>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}