'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function NavLink({ href, children }:{ href: string; children: React.ReactNode }){
  const pathname = usePathname() || '/'
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
  return (
    <Link
      href={href}
      className={[
        'px-2 py-1 rounded-md text-sm transition-colors',
        isActive ? 'bg-brandNavy text-white' : 'hover:bg-slate-100'
      ].join(' ')}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}
