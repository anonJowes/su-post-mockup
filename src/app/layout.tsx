import './globals.css'
import { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import Sidebar from '@/components/Sidebar'

export const metadata = {
  title: 'SUpost Marketplace',
  description: 'Community marketplace platform',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <NavBar />
        <div className="flex pt-16 min-h-screen">
          {/* Sidebar - 20% width */}
          <div className="w-1/5 hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content - 80% width */}
          <main className="w-full lg:w-4/5 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
