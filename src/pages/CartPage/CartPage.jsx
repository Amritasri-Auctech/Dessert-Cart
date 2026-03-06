import { useState } from "react";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";

const CartPage = ({ setPage, showToast }) => {
  const { items, subtotal, delivery, total, toFreeShip, removeFromCart, updateQty, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showToast("Please login to place order");
      setPage("login");
      return;
    }
    setOrdered(true);
    setTimeout(() => {
      clearCart();
      setOrdered(false);
      setPage("home");
    }, 3500);
  };

  // ── Order Success ──────────────────────────────────────────────────────────
  if (ordered) return (
    <div className="cart-page">
      <div className="order-success">
        <div className="success-emoji">🎉</div>
        <h2>Order Placed!</h2>
        <p>
          Your desserts are being prepared with love, {user?.name}!<br />
          Expected in 35–45 minutes 🍮
        </p>
      </div>
    </div>
  );

  // ── Empty Cart ─────────────────────────────────────────────────────────────
  if (items.length === 0) return (
    <div className="cart-page">
      <div className="cart-empty">
        <div className="empty-emoji">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious desserts to get started!</p>
        <button className="hero-cta" onClick={() => setPage("home")}>Browse Menu</button>
      </div>
    </div>
  );

  // ── Cart with Items ────────────────────────────────────────────────────────
  return (
    <div className="cart-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <div className="section-title">
          Your <span style={{ color: "var(--caramel)" }}>Cart</span>
        </div>
        <div style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginTop: "0.3rem" }}>
          {items.length} item{items.length > 1 ? "s" : ""} · Ready to indulge?
        </div>
      </div>

      <div className="cart-layout">
        {/* ── Items List ──────────────────────────────────────────────────── */}
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQty={updateQty}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* ── Order Summary ────────────────────────────────────────────────── */}
        <OrderSummary
          items={items}
          subtotal={subtotal}
          delivery={delivery}
          total={total}
          toFreeShip={toFreeShip}
          isLoggedIn={isLoggedIn}
          onCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

// ─── CART ITEM SUB-COMPONENT ──────────────────────────────────────────────────
const CartItem = ({ item, onUpdateQty, onRemove }) => (
  <div style={{
    background: "white", borderRadius: "16px", padding: "1.25rem",
    display: "flex", gap: "1rem", alignItems: "center",
    boxShadow: "var(--shadow)",
  }}>
    <div style={{
      fontSize: "2.5rem", width: 60, textAlign: "center", flexShrink: 0,
      background: "#FFF0E0", borderRadius: "12px", padding: "0.5rem",
    }}>
      {item.emoji}
    </div>

    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "0.75rem", color: "var(--caramel)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.2rem" }}>
        {item.category}
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1rem", color: "var(--chocolate)", marginBottom: "0.5rem" }}>
        {item.name}
      </div>

      {/* Qty Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <QtyBtn onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</QtyBtn>
        <span style={{ fontWeight: 600, fontSize: "0.95rem", minWidth: 20, textAlign: "center" }}>{item.qty}</span>
        <QtyBtn onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</QtyBtn>
      </div>
    </div>

    <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--chocolate)" }}>
      ₹{item.price * item.qty}
    </div>

    <button
      onClick={() => onRemove(item.id)}
      title="Remove"
      style={{ background: "none", border: "none", color: "#ccc", cursor: "pointer", fontSize: "1.1rem", padding: "0.25rem", transition: "color 0.2s" }}
      onMouseEnter={(e) => e.currentTarget.style.color = "var(--rose)"}
      onMouseLeave={(e) => e.currentTarget.style.color = "#ccc"}
    >
      ✕
    </button>
  </div>
);

// ─── ORDER SUMMARY SUB-COMPONENT ─────────────────────────────────────────────
const OrderSummary = ({ items, subtotal, delivery, total, toFreeShip, isLoggedIn, onCheckout }) => (
  <div style={{
    background: "white", borderRadius: "20px", padding: "1.75rem",
    boxShadow: "var(--shadow)", position: "sticky", top: "88px",
  }}>
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--chocolate)", marginBottom: "1.25rem" }}>
      Order Summary
    </div>

    {items.map((i) => (
      <SummaryRow key={i.id} label={`${i.name} × ${i.qty}`} value={`₹${i.price * i.qty}`} />
    ))}
    <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
    <SummaryRow
      label="Delivery"
      value={delivery === 0 ? "FREE" : `₹${delivery}`}
      valueStyle={{ color: delivery === 0 ? "var(--sage)" : "inherit" }}
    />

    {/* Total */}
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.15rem", fontWeight: 700, color: "var(--chocolate)", marginTop: "1rem", paddingTop: "1rem", borderTop: "1.5px solid #F0E8E0" }}>
      <span>Total</span><span>₹{total}</span>
    </div>

    <button
      onClick={onCheckout}
      style={{
        width: "100%", background: "linear-gradient(135deg, var(--chocolate), var(--choco-mid))",
        color: "white", border: "none", padding: "1rem", borderRadius: "12px",
        fontSize: "1rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
        cursor: "pointer", marginTop: "1.25rem", transition: "all 0.2s",
      }}
    >
      {isLoggedIn ? "Place Order 🍮" : "Login to Checkout →"}
    </button>

    {toFreeShip > 0 && (
      <div style={{ textAlign: "center", fontSize: "0.78rem", color: "var(--sage)", fontWeight: 600, marginTop: "0.75rem" }}>
        Add ₹{toFreeShip} more for free delivery!
      </div>
    )}
  </div>
);

// ─── TINY HELPERS ─────────────────────────────────────────────────────────────
const QtyBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background: "#F5EDE4", border: "none", width: 28, height: 28, borderRadius: "8px",
    cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center",
    justifyContent: "center", color: "var(--chocolate)", fontWeight: 700, transition: "background 0.2s",
  }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--caramel)"; e.currentTarget.style.color = "white"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "#F5EDE4"; e.currentTarget.style.color = "var(--chocolate)"; }}
  >
    {children}
  </button>
);

const SummaryRow = ({ label, value, valueStyle = {} }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem", color: "var(--text-soft)" }}>
    <span>{label}</span>
    <span style={valueStyle}>{value}</span>
  </div>
);

export default CartPage;