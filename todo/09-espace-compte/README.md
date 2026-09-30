# 09 — Espace compte utilisateur

## Tickets

### Backend (Django)
| Ticket | Titre | Dépend de |
|--------|-------|-----------|
| [BACK-01](BACK-01-auth-endpoints-jwt.md) | Auth : endpoints Django JWT | — |
| [BACK-02](BACK-02-api-profil-utilisateur.md) | API profil utilisateur | BACK-01 |
| [BACK-03](BACK-03-api-historique-commandes.md) | API historique commandes | BACK-01 |
| [BACK-04](BACK-04-api-historique-devis.md) | API historique devis | BACK-01 |

### Frontend (Next.js)
| Ticket | Titre | Dépend de |
|--------|-------|-----------|
| [FRONT-01](FRONT-01-setup-auth-nextauth.md) | Setup auth avec NextAuth.js | BACK-01 |
| [FRONT-02](FRONT-02-pages-connexion-inscription.md) | Pages connexion, inscription, reset MDP | FRONT-01, BACK-01 |
| [FRONT-03](FRONT-03-dashboard-mon-compte.md) | Dashboard `/mon-compte` | FRONT-01, BACK-02/03/04 |
| [FRONT-04](FRONT-04-historique-commandes.md) | Historique commandes | FRONT-01, BACK-03 |
| [FRONT-05](FRONT-05-historique-devis.md) | Historique devis | FRONT-01, BACK-04 |

## Ordre de réalisation recommandé

```
BACK-01
  └─> FRONT-01
        └─> FRONT-02
  └─> BACK-02 ─┐
  └─> BACK-03 ─┼─> FRONT-03
  └─> BACK-04 ─┘
        └─> FRONT-04
        └─> FRONT-05
```
