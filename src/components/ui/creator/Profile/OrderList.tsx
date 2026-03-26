import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

const ORDERS: any[] = [
  {
    id: "ORD-001", product: "Long T-shirt", qty: 4, price: 145.00, date: "30/01/26",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=shirt1",
    details: { country: "USA", address: "San Francisco, CA", contact: "+99 765 657", city: "San Francisco", postalCode: "1234" },
  },
  {
    id: "ORD-002", product: "Hoodie Classic", qty: 2, price: 89.00, date: "28/01/26",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=hoodie",
    details: { country: "Canada", address: "Toronto, ON", contact: "+1 416 555 0123", city: "Toronto", postalCode: "M5H 2N2" },
  },
  {
    id: "ORD-003", product: "Cap Embroidered", qty: 1, price: 34.00, date: "25/01/26",
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=cap",
    details: { country: "UK", address: "London, Greater London", contact: "+44 20 7946 0958", city: "London", postalCode: "EC1A 1BB" },
  },
];

function OrderDetailModal({ order, onClose }: any) {
  const detailRows: [string, string][] = [
    ["Country",     order.details.country],
    ["Address",     order.details.address],
    ["Contact",     order.details.contact],
    ["City",        order.details.city],
    ["Postal Code", order.details.postalCode],
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0f1020] rounded-3xl p-6 space-y-5 border-t border-white/8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto -mt-1 mb-2" />

        {/* Product row */}
        <div className="flex items-center justify-between bg-[#1a1b2e] rounded-2xl px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0f1020] overflow-hidden flex-shrink-0">
              <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{order.product}</p>
              <p className="text-gray-500 text-xs">× {order.qty}</p>
              <p className="text-indigo-400 text-xs font-semibold">${order.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">{order.date}</span>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Order details */}
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Order Details</p>
          <div className="bg-[#13141f] rounded-2xl border border-white/5 overflow-hidden divide-y divide-white/5">
            {detailRows.map(([key, val]) => (
              <div key={key} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-gray-400 text-sm">{key}</span>
                <span className="text-white text-sm">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderList() {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <div className="space-y-3">
        {ORDERS.map((order) => (
          <button
            key={order.id}
            onClick={() => setSelected(order)}
            className="w-full flex items-center justify-between bg-[#13141f] hover:bg-[#1a1b2e] border border-white/5 rounded-2xl px-4 py-3.5 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#0f1020] overflow-hidden flex-shrink-0">
                <img src={order.image} alt={order.product} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-semibold">{order.product}</p>
                <p className="text-gray-500 text-xs">× {order.qty}</p>
                <p className="text-indigo-400 text-xs font-semibold">${order.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">{order.date}</span>
              <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      {selected && <OrderDetailModal order={selected} onClose={() => setSelected(null)} />}
    </>
  );
}