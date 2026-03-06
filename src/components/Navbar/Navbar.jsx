import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

const Navbar = ({ setPage }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const { totalQty } = useCart();

  const handleLogout = () => { logout(); setPage("home"); };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,248,240,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(200,131,42,0.15)",
      padding: "0 2rem", display: "flex", alignItems: "center",
      justifyContent: "space-between", height: "68px",
    }}>
      {/* Logo */}
      <div onClick={() => setPage("home")} style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
        fontWeight: 900, color: "var(--chocolate)", cursor: "pointer", letterSpacing: "-0.5px",
      }}>
        Dessert<span style={{ color: "var(--caramel)" }}>Cart</span> 🍮
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            {/* User Chip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "#FFF0E0", borderRadius: "50px",
              padding: "0.35rem 0.75rem 0.35rem 0.35rem",
            }}>
              <div style={{
                width: 28, height: 28, background: "var(--caramel)",
                borderRadius: "50%", display: "flex", alignItems: "center",
                justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem",
              }}>
                {user.name[0].toUpperCase()}
              </div>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--choco-mid)" }}>
                {user.name}
              </span>
            </div>
            <NavButton onClick={handleLogout}>Logout</NavButton>
          </>
        ) : (
          <NavButton onClick={() => setPage("login")}>Login</NavButton>
        )}

        {/* Cart Button */}
        <NavButton onClick={() => setPage("cart")} active>
          🛒 Cart{" "}
          {totalQty > 0 && (
            <span style={{
              background: "var(--rose)", color: "white", borderRadius: "50%",
              width: 18, height: 18, fontSize: "0.7rem",
              display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
            }}>
              {totalQty}
            </span>
          )}
        </NavButton>
      </div>
    </nav>
  );
};

// ─── SMALL REUSABLE NAV BUTTON ────────────────────────────────────────────────
const NavButton = ({ children, onClick, active }) => (
  <button onClick={onClick} style={{
    background: active ? "var(--chocolate)" : "none",
    border: `1.5px solid ${active ? "var(--chocolate)" : "rgba(200,131,42,0.3)"}`,
    color: active ? "white" : "var(--choco-mid)",
    padding: "0.45rem 1.1rem", borderRadius: "50px",
    fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500, cursor: "pointer",
    display: "flex", alignItems: "center", gap: "0.4rem",
    transition: "all 0.2s",
  }}>
    {children}
  </button>
);

export default Navbar;