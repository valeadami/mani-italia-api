// Helper: data odierna + offset giorni, formato YYYY-MM-DD
function daysFromNow(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

// Helper: data in formato italiano GG/MM/AAAA
function daysFromNowIT(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("it-IT");
}

function getOrders() {
  return {
    "ORD-2026-001": {
      order_id: "ORD-2026-001",
      customer: "Sofia Russo",
      status: "CONSEGNATO",
      status_label: "Consegnato",
      products: [
        { code: "MI-001", name: "Borsa Tracolla Firenze", qty: 1, note: "Personalizzata: iniziali SR" }
      ],
      total: 159.00,
      tracking_number: "GLS7829461234IT",
      carrier: "GLS",
      delivery_date: daysFromNow(-3),        // consegnato 3 giorni fa
      delivery_time: "14:30",
      estimated_delivery: null
    },
    "ORD-2026-002": {
      order_id: "ORD-2026-002",
      customer: "Marco Bianchi",
      status: "IN_TRANSITO",
      status_label: "In transito",
      products: [
        { code: "MI-004", name: "Portafoglio Classico", qty: 1 },
        { code: "MI-009", name: "Astuccio Matita", qty: 1 }
      ],
      total: 98.00,
      tracking_number: "GLS8934512678IT",
      carrier: "GLS",
      delivery_date: null,
      delivery_time: null,
      estimated_delivery: daysFromNow(2)     // arriva tra 2 giorni
    },
    "ORD-2026-003": {
      order_id: "ORD-2026-003",
      customer: "Elena Conti",
      status: "IN_LAVORAZIONE",
      status_label: "In lavorazione",
      products: [
        { code: "MI-002", name: "Zaino Urbano Siena", qty: 1, note: "Personalizzato: monogramma EC" }
      ],
      total: 189.00,
      tracking_number: null,
      carrier: "GLS",
      delivery_date: null,
      delivery_time: null,
      estimated_delivery: null,
      estimated_shipping: daysFromNow(15),   // spedizione tra ~2 settimane
      note: `Preordine, produzione iniziata il ${daysFromNowIT(-5)}`
    },
    "ORD-2026-004": {
      order_id: "ORD-2026-004",
      customer: "Andrea Moretti",
      status: "PRONTO_PER_SPEDIZIONE",
      status_label: "Pronto per la spedizione",
      products: [
        { code: "MI-008", name: "Shopper Cotone Bio", qty: 10 },
        { code: "MI-010", name: "Tovagliette Rustiche (set 2)", qty: 5 }
      ],
      total: 470.00,
      tracking_number: null,
      carrier: "GLS",
      delivery_date: null,
      delivery_time: null,
      estimated_delivery: null,
      estimated_shipping: daysFromNow(1),    // spedisce domani
      note: "Ordine aziendale - fattura richiesta"
    },
    "ORD-2026-009": {
      order_id: "ORD-2026-009",
      customer: "Francesca Sartori",
      status: "RESO_IN_CORSO",
      status_label: "Reso in corso",
      products: [
        { code: "MI-001", name: "Borsa Tracolla Firenze", qty: 1 },
        { code: "MI-006", name: "Cuscino Casa Soft", qty: 2 }
      ],
      total: 237.00,
      tracking_number: "GLS7456123890IT",
      carrier: "GLS",
      delivery_date: null,
      delivery_time: null,
      estimated_delivery: null,
      note: `Reso richiesto il ${daysFromNowIT(-1)}`
    }
  };
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { order_id } = req.query;

  if (!order_id) {
    return res.status(400).json({ error: "Parametro order_id mancante" });
  }

  const orders = getOrders();
  const order = orders[order_id.toUpperCase()];

  if (!order) {
    return res.status(404).json({
      error: "Ordine non trovato",
      message: `Nessun ordine trovato con ID ${order_id}`
    });
  }

  return res.status(200).json(order);
}
