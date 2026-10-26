'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const fallbackItems = [
    { href: '/#topics', label: 'Topics' },
    { href: '/system-architecture', label: 'Architecture' },
    { href: '/admin', label: 'CMS' },
  ]

  return (
    <nav className="flex gap-3 items-center">
      {navItems.length > 0
        ? navItems.map(({ link }, i) => <CMSLink key={i} {...link} appearance="link" />)
        : fallbackItems.map(({ href, label }) => (
            <Link
              className={`text-sm font-medium ${href === '/system-architecture' ? 'hidden sm:inline-flex' : ''}`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
