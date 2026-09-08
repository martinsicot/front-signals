'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import type { DevisPayload } from '@/app/api/devis/route'

const inputStyle: React.CSSProperties = {
  padding: '10px 12px',
  border: '1px solid var(--border)',
  borderRadius: 8,
  fontSize: 14,
  color: 'var(--ink)',
  background: 'var(--bg)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

function formatHT(value: number): string {
  return value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function DevisForm() {
  const searchParams = useSearchParams()
  const fromPanier = searchParams.get('from') === 'panier'
  const { items, totalHT } = useCart()

  const [form, setForm] = useState({ nom: '', societe: '', email: '', telephone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const payload: DevisPayload = {
      nom: form.nom,
      societe: form.societe || undefined,
      email: form.email,
      telephone: form.telephone || undefined,
      message: form.message || undefined,
      ...(fromPanier && items.length > 0 && {
        items: items.map(i => ({ name: i.productName, sku: i.sku, quantity: i.quantity })),
        totalHT,
      }),
    }

    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '64px 24px' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'var(--verde-light)', border: '1px solid var(--verde-mid)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="var(--verde)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, marginBottom: 10 }}>
          Demande envoyée !
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', maxWidth: 400, margin: '0 auto 32px' }}>
          Nous vous répondons avec un devis détaillé sous 24 heures.
        </p>
        <Link href="/" style={{
          display: 'inline-block', padding: '12px 24px',
          background: 'var(--verde)', color: 'white',
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
          borderRadius: 'var(--r)', textDecoration: 'none',
        }}>
          Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>
      <p className="label" style={{ marginBottom: 8 }}>Demande de devis</p>
      <h1 style={{ fontSize: 28, letterSpacing: '-0.02em', marginBottom: 10 }}>
        {fromPanier ? 'Finaliser votre devis' : 'Demander un devis'}
      </h1>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)', marginBottom: 40 }}>
        {fromPanier
          ? 'Les articles de votre panier seront joints à la demande. Nous vous répondons sous 24 h.'
          : 'Décrivez vos besoins et nous vous répondrons avec un devis détaillé sous 24 h.'}
      </p>

      {/* Cart preview */}
      {fromPanier && items.length > 0 && (
        <div style={{
          background: 'var(--surface-alt)', borderRadius: 10,
          padding: '16px 20px', marginBottom: 36,
          border: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--ink)' }}>
            Articles concernés
          </p>
          {items.map(item => (
            <div key={item.variantId} style={{
              display: 'flex', justifyContent: 'space-between',
              fontSize: 13, color: 'var(--ink-muted)',
              padding: '5px 0', borderBottom: '1px solid var(--border)',
            }}>
              <span>
                {item.productName}
                {item.attributes.length > 0 && (
                  <span style={{ marginLeft: 6, opacity: 0.7 }}>
                    ({item.attributes.map(a => a.display).join(' · ')})
                  </span>
                )}
              </span>
              <span style={{ color: 'var(--ink)', fontWeight: 600, marginLeft: 16 }}>× {item.quantity}</span>
            </div>
          ))}
          <p style={{
            fontSize: 13, textAlign: 'right', marginTop: 10,
            fontWeight: 600, color: 'var(--ink)',
          }}>
            Total HT : {formatHT(totalHT)} €
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="devis-grid">
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Nom *</span>
            <input
              name="nom" required value={form.nom} onChange={handleChange}
              placeholder="Jean Dupont"
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Société</span>
            <input
              name="societe" value={form.societe} onChange={handleChange}
              placeholder="Mairie de Lyon"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="devis-grid">
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Email *</span>
            <input
              name="email" type="email" required value={form.email} onChange={handleChange}
              placeholder="jean@mairie.fr"
              style={inputStyle}
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Téléphone</span>
            <input
              name="telephone" type="tel" value={form.telephone} onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
              style={inputStyle}
            />
          </label>
        </div>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            {fromPanier ? 'Informations complémentaires' : 'Votre besoin *'}
          </span>
          <textarea
            name="message"
            required={!fromPanier}
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder={fromPanier
              ? 'Délai souhaité, adresse de livraison, questions particulières…'
              : 'Références, quantités, délai souhaité, contexte du projet…'}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>

        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '13px 28px',
              background: 'var(--verde)', color: 'white',
              border: 'none', borderRadius: 'var(--r)',
              cursor: status === 'loading' ? 'default' : 'pointer',
              opacity: status === 'loading' ? 0.7 : 1,
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
            }}
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer la demande'}
          </button>
          {status === 'error' && (
            <p style={{ fontSize: 13, color: '#c0392b' }}>
              Une erreur est survenue. Réessayez ou écrivez à devis@strada-signal.fr.
            </p>
          )}
        </div>
      </form>

      <style>{`
        @media (max-width: 480px) {
          .devis-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
