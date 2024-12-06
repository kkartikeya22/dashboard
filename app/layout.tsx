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
  title: "Dashboard",
  description: "Your application description",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <Providers>
          <div className="flex h-screen">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <AppTopbar />
              <AppContent>
                {children}
              </AppContent>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}