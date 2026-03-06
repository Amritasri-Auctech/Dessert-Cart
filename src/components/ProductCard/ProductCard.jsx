import { useSelector } from "react-redux";
import useCart from "../../hooks/useCart";
import { selectCartItemById } from "../../store/selectors";

const ProductCard = ({ item, showToast }) => {
  const { addToCart } = useCart();
  const inCart = useSelector(selectCartItemById(item.id));

  const handleAdd = () => {
    addToCart(item);
    showToast(`${item.name} added to cart!`);
  };

  return (
    <div style={{
      background: "white", borderRadius: "20px", overflow: "hidden",
      boxShadow: "var(--shadow)", transition: "all 0.3s", position: "relative",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow)"; }}
    >
      {/* Image / Emoji Area */}
      <div style={{
        background: "linear-gradient(135deg, #FFF0E0, #FFE0C0)",
        padding: "2rem", textAlign: "center", fontSize: "4rem", position: "relative",
      }}>
        {item.tag && (
          <span style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            background: "var(--chocolate)", color: "white",
            fontSize: "0.7rem", fontWeight: 600,
            padding: "0.25rem 0.65rem", borderRadius: "50px", letterSpacing: "0.5px",
          }}>
            {item.tag}
          </span>
        )}
        <div>{item.emoji}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem" }}>
        <div style={{ fontSize: "0.72rem", color: "var(--caramel)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "0.4rem" }}>
          {item.category}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--chocolate)", marginBottom: "0.4rem" }}>
          {item.name}
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginBottom: "0.75rem" }}>
          <span style={{ color: "#F59E0B" }}>★</span> {item.rating} · Handcrafted Daily
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-soft)", lineHeight: 1.5, marginBottom: "1rem" }}>
          {item.desc}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--chocolate)" }}>
            <sup style={{ fontSize: "0.75rem" }}>₹</sup>{item.price}
          </div>
          <button onClick={handleAdd} style={{
            background: inCart ? "var(--sage)" : "var(--chocolate)",
            color: "white", border: "none",
            padding: "0.55rem 1.25rem", borderRadius: "50px",
            fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: "0.35rem",
          }}>
            {inCart ? `✓ In Cart (${inCart.qty})` : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;