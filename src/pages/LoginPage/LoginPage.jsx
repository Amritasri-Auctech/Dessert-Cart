import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const LoginPage = ({ setPage, showToast }) => {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError]       = useState("");
  const [form, setForm]         = useState({ name: "", email: "", password: "" });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = () => {
    setError("");
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    if (isSignup && !form.name)        { setError("Please enter your name."); return; }
    if (form.password.length < 6)      { setError("Password must be at least 6 characters."); return; }

    const name = isSignup ? form.name : form.email.split("@")[0];
    login({ name, email: form.email });
    showToast(`Welcome, ${name}! 🎉`);
    setPage("cart");
  };

  const handleGuest = () => {
    login({ name: "Guest", email: "guest@dessertcart.in" });
    showToast("Browsing as Guest 👋");
    setPage("home");
  };

  return (
    <div className="login-page">
      <div style={{
        background: "white", borderRadius: "28px", padding: "3rem 2.5rem",
        maxWidth: "420px", width: "100%", boxShadow: "var(--shadow-lg)",
      }}>
        {/* Header */}
        <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: "0.75rem" }}>🍰</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "var(--chocolate)", textAlign: "center", marginBottom: "0.4rem" }}>
          {isSignup ? "Join Us" : "Welcome Back"}
        </div>
        <div style={{ textAlign: "center", color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          {isSignup ? "Create your DessertCart account" : "Sign in to place your order"}
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: "#FFF0EE", border: "1px solid #F4B8B0", borderRadius: "10px", padding: "0.75rem 1rem", color: "#C0392B", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>
            ⚠ {error}
          </div>
        )}

        {/* Form */}
        {isSignup && (
          <FormField label="Your Name" placeholder="e.g. Priya Sharma" value={form.name} onChange={update("name")} />
        )}
        <FormField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
        <FormField
          label="Password" type="password" placeholder="Min 6 characters"
          value={form.password} onChange={update("password")}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* Submit */}
        <button onClick={handleSubmit} style={primaryBtnStyle}>
          {isSignup ? "Create Account →" : "Sign In →"}
        </button>

        {/* Divider */}
        <div style={{ textAlign: "center", color: "var(--text-soft)", fontSize: "0.85rem", margin: "1.25rem 0", position: "relative" }}>
          <span style={{ background: "white", padding: "0 0.75rem", position: "relative", zIndex: 1 }}>or</span>
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#E8D8C8" }} />
        </div>

        {/* Guest */}
        <button onClick={handleGuest} style={guestBtnStyle}>Continue as Guest</button>

        {/* Toggle Sign In / Sign Up */}
        <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--text-soft)" }}>
          {isSignup ? "Already have an account? " : "New here? "}
          <span
            onClick={() => { setIsSignup(!isSignup); setError(""); }}
            style={{ color: "var(--caramel)", fontWeight: 600, cursor: "pointer" }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
const FormField = ({ label, type = "text", placeholder, value, onChange, onKeyDown }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--choco-mid)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.8px" }}>
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{
        width: "100%", border: "1.5px solid #E8D8C8", borderRadius: "12px",
        padding: "0.8rem 1rem", fontSize: "0.95rem", fontFamily: "'DM Sans', sans-serif",
        color: "var(--text-main)", background: "#FFFCF8", outline: "none", transition: "border-color 0.2s",
      }}
      onFocus={(e)  => { e.target.style.borderColor = "var(--caramel)"; e.target.style.background = "white"; }}
      onBlur={(e)   => { e.target.style.borderColor = "#E8D8C8"; e.target.style.background = "#FFFCF8"; }}
    />
  </div>
);

// ─── STYLES ───────────────────────────────────────────────────────────────────
const primaryBtnStyle = {
  width: "100%",
  background: "linear-gradient(135deg, var(--chocolate), var(--choco-mid))",
  color: "white", border: "none", padding: "1rem", borderRadius: "12px",
  fontSize: "1rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
  cursor: "pointer", marginTop: "0.5rem", transition: "all 0.2s",
};

const guestBtnStyle = {
  width: "100%", background: "white",
  border: "1.5px solid #E8D8C8", color: "var(--choco-mid)",
  padding: "0.8rem", borderRadius: "12px",
  fontSize: "0.9rem", fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500, cursor: "pointer", transition: "all 0.2s",
};

export default LoginPage;