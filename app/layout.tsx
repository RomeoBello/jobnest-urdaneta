import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'
import NavLink from '@/components/NavLink'
<Link href="/terms" className="underline">Terms</Link>


const siteName = 'JobNest Urdaneta City'
const siteDesc = 'Connecting employers and job seekers locally in Urdaneta City, Pangasinan.'
const siteUrl = 'https://jobnest.mysdproject2025.com' // update when deployed

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s · ' + siteName,
  },
  description: siteDesc,
  keywords: [
    'Urdaneta City jobs', 'Pangasinan jobs', 'local hiring',
    'JobNest Urdaneta City', 'Urdaneta employers', 'Urdaneta careers'
  ],
  openGraph: {
    title: siteName,
    description: siteDesc,
    url: siteUrl,
    siteName,
    locale: 'en_PH',
    type: 'website',
    images: [{ url: '/logo-jobnest-urdaneta.png', width: 1200, height: 630, alt: 'JobNest Urdaneta City' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDesc,
    images: ['/logo-jobnest-urdaneta.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#0A2D4A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div className="leading-tight">
                <div className="font-extrabold text-lg text-brandNavy">JobNest</div>
                <div className="text-[11px] tracking-wide text-brandGold">Urdaneta City</div>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-sm">
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/employers">Employers</NavLink>
              <NavLink href="/seekers">Job Seekers</NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <NavLink href="/signin">Sign In</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="py-10 bg-white border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <div>
                <div className="font-bold text-brandNavy">JobNest Urdaneta City</div>
                <div className="text-xs text-slate-500">Connecting Urdaneta to opportunities</div>
              </div>
            </div>
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} JobNest Urdaneta City. All rights reserved.</div>
            <div className="flex justify-start md:justify-end gap-4 text-sm">
              <Link href="/pricing" className="underline">Pricing</Link>
              <Link href="/faq" className="underline">FAQ</Link>
              <Link href="/policy" className="underline">Policy</Link>
              <Link href="/contact" className="underline">Contact Us</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
