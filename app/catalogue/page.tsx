import { api } from '@/lib/api/server'
import ProductCard from '@/components/catalog/ProductCard'
import CategorySidebar from '@/components/catalog/CategorySidebar'

export const metadata = {
  title: 'Catalogue — Strada',
  description: 'Tous nos panneaux de signalisation, mobilier urbain et équipements de sécurité.',
}

export default async function CataloguePage() {
  const [products, categories] = await Promise.all([
    api.products(),
    api.categories(),
  ])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p className="label" style={{ marginBottom: 6 }}>Catalogue</p>
        <h1 style={{ fontSize: 32, letterSpacing: '-0.02em' }}>Tous les produits</h1>
        <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginTop: 8 }}>
          {products.length} référence{products.length > 1 ? 's' : ''}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div className="catalog-sidebar">
          <CategorySidebar categories={categories} />
        </div>

        {/* Grid */}
        <div style={{ flex: 1 }}>
          {products.length === 0 ? (
            <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Aucun produit disponible.</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }} className="catalog-grid">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .catalog-sidebar { display: none; }
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
