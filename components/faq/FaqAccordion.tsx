'use client'

import { useState } from 'react'

type FaqItem = {
  question: string
  answer: string
}

type FaqGroup = {
  category: string
  items: FaqItem[]
}

export default function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {groups.map((group) => (
        <div key={group.category}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 17, fontWeight: 600, marginBottom: 12,
            paddingBottom: 8, borderBottom: '1px solid var(--border)',
          }}>
            {group.category}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {group.items.map((item) => {
              const id = `${group.category}::${item.question}`
              const isOpen = open === id
              return (
                <div
                  key={item.question}
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'none', border: 'none',
                      cursor: 'pointer', padding: '14px 0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span style={{
                      fontSize: 14, fontWeight: 600,
                      color: 'var(--ink)',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}>
                      {item.question}
                    </span>
                    <span style={{
                      fontSize: 18, color: 'var(--ink-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{
                      fontSize: 14, lineHeight: 1.75,
                      color: 'var(--ink-muted)',
                      paddingBottom: 16, marginTop: -4,
                    }}>
                      {item.answer}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
