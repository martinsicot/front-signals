'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import type { PaginatedResponse, ProductListItem } from '@/lib/api/server'

type Props = {
  onClose: () => void
}

const DEBOUNCE_MS = 250
const MAX_SUGGESTIONS = 6

export default function SearchOverlay({ onClose }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ProductListItem[]>([])
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [active, setActive] = useState(-1)

  const trimmed = query.trim()

  // Autofocus on mount (deferred until the input is painted).
  useEffect(() => {
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    return () => cancelAnimationFrame(id)
  }, [])

  // Debounced fetch with stale-request cancellation. All state updates happen
  // inside the timeout callback so the effect body stays free of synchronous
  // setState (avoids cascading renders).
  useEffect(() => {
    const handle = setTimeout(async () => {
      if (trimmed.length === 0) {
        abortRef.current?.abort()
        setResults([])
        setCount(0)
        setStatus('idle')
        setActive(-1)
        return
      }

      setStatus('loading')
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch(
          `/api/products?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as PaginatedResponse<ProductListItem>
        setResults(data.results.slice(0, MAX_SUGGESTIONS))
        setCount(data.count)
        setStatus('done')
        setActive(-1)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setStatus('error')
        setResults([])
        setCount(0)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [trimmed])

  const goToProduct = useCallback(
    (slug: string) => {
      onClose()
      router.push(`/produits/${slug}`)
    },
    [onClose, router],
  )

  const goToCatalogue = useCallback(() => {
    if (!trimmed) return
    onClose()
    router.push(`/catalogue?q=${encodeURIComponent(trimmed)}`)
  }, [trimmed, onClose, router])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(a + 1, results.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, -1))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0 && results[active]) goToProduct(results[active].slug)
      else goToCatalogue()
    }
  }

  return (
    <div
      role="presentation"
      onMouseDown={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '10vh 16px 16px',
      }}
    >
      <div
        onMouseDown={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 560,
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-md)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        {/* Input row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 16px', borderBottom: '1px solid var(--border)',
        }}>
          <svg width={18} height={18} viewBox="0 0 17 17" fill="none" stroke="var(--ink-muted)" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx={7} cy={7} r={5.5} />
            <path d="m11 11 3.5 3.5" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results-list"
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 ? `search-result-${active}` : undefined}
            placeholder="Rechercher un produit ou un code…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontSize: 16, color: 'var(--ink)',
            }}
          />
          <kbd style={{
            fontSize: 11, color: 'var(--ink-muted)',
            border: '1px solid var(--border)', borderRadius: 4,
            padding: '2px 6px', fontFamily: 'inherit',
          }}>Esc</kbd>
        </div>

        {/* Results */}
        <div style={{ overflowY: 'auto' }}>
          {status === 'idle' && (
            <p style={{ padding: '20px 16px', fontSize: 13, color: 'var(--ink-muted)' }}>
              Tapez pour rechercher parmi nos produits.
            </p>
          )}

          {status === 'loading' && (
            <p style={{ padding: '20px 16px', fontSize: 13, color: 'var(--ink-muted)' }}>
              Recherche…
            </p>
          )}

          {status === 'error' && (
            <p style={{ padding: '20px 16px', fontSize: 13, color: 'var(--ink-muted)' }}>
              Une erreur est survenue. Réessayez.
            </p>
          )}

          {status === 'done' && results.length === 0 && (
            <p style={{ padding: '20px 16px', fontSize: 13, color: 'var(--ink-muted)' }}>
              Aucun résultat pour « {trimmed} ».
            </p>
          )}

          {results.length > 0 && (
            <ul id="search-results-list" role="listbox" style={{ listStyle: 'none', margin: 0, padding: 4 }}>
              {results.map((p, i) => (
                <li key={p.id} id={`search-result-${i}`} role="option" aria-selected={active === i}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => goToProduct(p.slug)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', border: 'none', borderRadius: 8, cursor: 'pointer',
                      background: active === i ? 'var(--surface-alt)' : 'transparent',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{
                      width: 40, height: 40, flexShrink: 0,
                      background: 'var(--surface-alt)', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', position: 'relative',
                    }}>
                      {p.thumbnail || p.image ? (
                        <Image src={(p.thumbnail ?? p.image) as string} alt="" fill sizes="40px" style={{ objectFit: 'contain', padding: 4 }} />
                      ) : (
                        <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
                          <path d="M8 12h8M12 8v8" stroke="var(--border-strong)" strokeWidth={2} strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--ink)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}>{p.name}</span>
                      <span style={{ display: 'block', fontSize: 12, color: 'var(--ink-muted)' }}>
                        {p.base_code}{p.categories[0] ? ` · ${p.categories[0].name}` : ''}
                      </span>
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', flexShrink: 0 }}>
                      {p.min_price != null && !Number.isNaN(parseFloat(p.min_price))
                        ? `dès ${parseFloat(p.min_price).toFixed(2).replace('.', ',')} €`
                        : 'Sur devis'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {status === 'done' && count > 0 && (
            <button
              type="button"
              onClick={goToCatalogue}
              style={{
                width: '100%', padding: '12px 16px', border: 'none',
                borderTop: '1px solid var(--border)', cursor: 'pointer',
                background: 'transparent', textAlign: 'left',
                fontSize: 13, fontWeight: 600, color: 'var(--verde)',
              }}
            >
              Voir {count > MAX_SUGGESTIONS ? `les ${count} résultats` : 'tous les résultats'} →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
