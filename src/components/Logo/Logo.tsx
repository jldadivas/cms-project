import clsx from 'clsx'
import { Smartphone } from 'lucide-react'
import React from 'react'

interface Props {
  className?: string
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={clsx('inline-flex items-center gap-2.5', className)}>
      <span className="grid size-9 place-items-center rounded-full bg-[#d0e978] text-[#173c34]">
        <Smartphone aria-hidden="true" className="size-5" />
      </span>
      <span className="text-base font-semibold">Expo Go Guide</span>
    </span>
  )
}
