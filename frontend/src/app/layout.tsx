import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CUSoon - Home',
  description: 'Connecting Cornell to the world 🌎',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col">
          <div className="relative flex flex-col flex-grow bg-gray-200">
            <NavBar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
