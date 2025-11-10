import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Abdooay Blog: I write about web development',
  description: 'A blog about web development, TDD, Golang, and design patterns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="py-8 border-b border-gray-300">
            <nav className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold hover:no-underline">
                Abdooay
              </Link>
              <div className="space-x-6">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
              </div>
            </nav>
          </header>
          <main className="py-8">
            {children}
          </main>
          <footer className="py-8 border-t border-gray-300 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Abdooay. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
