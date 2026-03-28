const ORDERS: any[] = [
  {
    id: "#12345678", date: "30/01/26", total: "$145.00",
    items: [
      { name: "Spark Tee", qty: 2, price: "$145.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
      { name: "Spark Tee", qty: 2, price: "$145.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
    ],
  },
  {
    id: "#12345679", date: "30/01/26", total: "$145.00",
    items: [
      { name: "Spark Tee", qty: 2, price: "$145.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
      { name: "Spark Tee", qty: 2, price: "$145.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop" },
    ],
  },
];


export default function OrderHistory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {ORDERS.map(order => (
        <div key={order.id}>
          {/* Order header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto auto auto",
            alignItems: "start",
            gap: "0 12px",
            marginBottom: 12,
            paddingBottom: 10,
          }}>
            <div>
              <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 2 }}>Order Id</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{order.id}</div>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 2 }}>Items</div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                {String(order.items.length).padStart(2, "0")}
              </div>
            </div>
            <div>
              <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 2 }}>Price</div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{order.total}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 2 }}>Date</div>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{order.date}</div>
            </div>
          </div>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {order.items.map((item:any, idx:number) => (
              <div key={idx} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#1a1b2e", borderRadius: 14, padding: "12px 14px", gap: 14,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 0 }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      width: 68, height: 68, borderRadius: 10,
                      objectFit: "cover", flexShrink: 0, background: "#1a1b2e",
                    }}
                  />
                  <div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{item.name}</div>
                    <div style={{ color: "#6b7280", fontSize: 13, marginTop: 3 }}>x{item.qty}</div>
                  </div>
                </div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}