/*
 * File: DancerSvg.tsx
 * Purpose: Stylized dancer mascot SVG for the login page brand panel.
 * The dancer's pupils track the user's mouse cursor for an interactive
 * feel. Uses Tailwind fill classes for theme-compliant colors.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useRef } from 'react'
import type { ReactElement } from 'react'
import './dancer.css'
import { useDancerEyes } from '../hooks/useDancerEyes'

export function DancerSvg(): ReactElement {
  const ref = useRef<SVGSVGElement | null>(null)
  const { x, y } = useDancerEyes(ref)
  return (
    <div className="dancer-float">
      <svg
        ref={ref}
        viewBox="0 0 160 255"
        className="w-44 drop-shadow-2xl"
        aria-hidden="true"
      >
        <circle cx="80" cy="20" r="9" className="fill-stone-800" />
        <circle cx="80" cy="44" r="24" className="fill-rose-100" />
        <circle cx="72" cy="41" r="7" className="fill-white" />
        <circle cx={72 + x} cy={41 + y} r="3.5" className="fill-violet-900" />
        <circle cx="88" cy="41" r="7" className="fill-white" />
        <circle cx={88 + x} cy={41 + y} r="3.5" className="fill-violet-900" />
        <rect x="76" y="67" width="8" height="9" className="fill-rose-100" />
        <path
          d="M68,76 Q80,72 92,76 L90,105 Q80,102 70,105 Z"
          className="fill-violet-700"
        />
        <path
          d="M70,83 Q50,67 32,52"
          strokeWidth={5}
          strokeLinecap="round"
          className="fill-none stroke-rose-100"
        />
        <path
          d="M90,83 Q110,67 128,52"
          strokeWidth={5}
          strokeLinecap="round"
          className="fill-none stroke-rose-100"
        />
        <path
          d="M70,103 Q80,100 90,103 L95,143 Q80,147 65,143 Z"
          className="fill-violet-600"
        />
        <path
          d="M65,141 Q35,162 18,208 L142,208 Q125,162 95,141 Z"
          className="fill-violet-500"
        />
        <path
          d="M18,206 Q80,220 142,206 Q80,216 18,206 Z"
          className="fill-purple-400"
        />
        <path
          d="M72,205 Q68,220 62,240"
          strokeWidth={5}
          strokeLinecap="round"
          className="fill-none stroke-rose-100"
        />
        <path
          d="M88,205 Q92,220 98,240"
          strokeWidth={5}
          strokeLinecap="round"
          className="fill-none stroke-rose-100"
        />
        <ellipse cx="60" cy="242" rx="10" ry="5" className="fill-violet-900" />
        <ellipse cx="100" cy="242" rx="10" ry="5" className="fill-violet-900" />
      </svg>
    </div>
  )
}
