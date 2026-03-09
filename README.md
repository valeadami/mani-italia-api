# Mani d'Italia — Order Status API

Backend demo per la GPT Action del Custom GPT di Mani d'Italia.
Deployato su Vercel come serverless function Node.js.

## Endpoint

```
GET https://mani-italia-api.vercel.app/api/order-status?order_id={ORDER_ID}
```

### Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|---|---|---|---|
| `order_id` | string | sì | Numero ordine (es. `ORD-2026-001`) |

### Esempio risposta

```json
{
  "order_id": "ORD-2026-002",
  "customer": "Marco Bianchi",
  "status": "IN_TRANSITO",
  "status_label": "In transito",
  "products": [
    { "code": "MI-004", "name": "Portafoglio Classico", "qty": 1 },
    { "code": "MI-009", "name": "Astuccio Matita", "qty": 1 }
  ],
  "total": 98.00,
  "tracking_number": "GLS8934512678IT",
  "carrier": "GLS",
  "estimated_delivery": "2026-03-12"
}
```

### Codici di risposta

| Codice | Descrizione |
|---|---|
| `200` | Ordine trovato |
| `400` | Parametro `order_id` mancante |
| `404` | Ordine non trovato |
| `405` | Metodo non consentito |

## Ordini demo disponibili

| ID Ordine | Cliente | Stato |
|---|---|---|
| ORD-2026-001 | Sofia Russo | CONSEGNATO |
| ORD-2026-002 | Marco Bianchi | IN_TRANSITO |
| ORD-2026-003 | Elena Conti | IN_LAVORAZIONE |
| ORD-2026-004 | Andrea Moretti | PRONTO_PER_SPEDIZIONE |
| ORD-2026-009 | Francesca Sartori | RESO_IN_CORSO |

## Struttura progetto

```
mani-italia-api/
├── api/
│   └── order-status.js   # Serverless function con dati hardcoded
└── package.json
```

## Integrazione Custom GPT

Lo schema OpenAPI da incollare nella sezione **Actions** del Custom GPT è disponibile nel file `schema_mani_italia.txt`.

1. Aprire il Custom GPT → **Configure** → **Add action**
2. Incollare il contenuto di `schema_mani_italia.txt`
3. Autenticazione: **None**
4. Salvare

## Note

Questo progetto è una **demo** con dati hardcoded, pensata per testare il flusso Custom GPT → Action → API.
Per un ambiente di produzione i dati andrebbero sostituiti con query a un database reale.
