import { useEffect } from "react";

const Toast = ({ msg, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 2200);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem",
      background: "var(--chocolate)", color: "white",
      padding: "0.85rem 1.5rem", borderRadius: "12px",
      fontSize: "0.9rem", fontWeight: 500,
      boxShadow: "var(--shadow-lg)", zIndex: 999,
      animation: "slideUp 0.3s ease",
      display: "flex", alignItems: "center", gap: "0.5rem",
    }}>
      🛒 {msg}
    </div>
  );
};

export default Toast;