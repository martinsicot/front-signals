'use client'

import { useState } from 'react'
import SearchOverlay from './SearchOverlay'

export default function CatalogSearchBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', maxWidth: 280,
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: 8,
          background: 'var(--surface-alt)',
          cursor: 'text',
          color: 'var(--ink-muted)',
          fontSize: 13,
          marginTop: 16,
        }}
      >
        <svg width={16} height={16} viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx={7} cy={7} r={5.5} />
          <path d="m11 11 3.5 3.5" />
        </svg>
        <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Rechercher un produit…</span>
        <kbd style={{ fontSize: 11, border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', fontFamily: 'inherit' }}>⌘K</kbd>
      </button>
      {open && <SearchOverlay onClose={() => setOpen(false)} />}
    </>
  )
}
