import { useState, useEffect } from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

// ─── REDUX SETUP ───────────────────────────────────────────────────────────────
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_QTY = "UPDATE_QTY";
const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const CLEAR_CART = "CLEAR_CART";

const initialState = {
  cart: [],
  user: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const existing = state.cart.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }
    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((i) => i.id !== action.payload) };
    case UPDATE_QTY:
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ).filter((i) => i.qty > 0),
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

// ─── DATA ──────────────────────────────────────────────────────────────────────
const DESSERTS = [
  { id: 1, name: "Crème Brûlée", category: "French", price: 349, emoji: "🍮", desc: "Classic vanilla custard with caramelized sugar crust", rating: 4.9, tag: "Bestseller" },
  { id: 2, name: "Tiramisu", category: "Italian", price: 299, emoji: "☕", desc: "Espresso-soaked ladyfingers with mascarpone cream", rating: 4.8, tag: "Popular" },
  { id: 3, name: "Chocolate Lava Cake", category: "French", price: 389, emoji: "🍫", desc: "Warm dark chocolate cake with molten center", rating: 4.9, tag: "Chef's Pick" },
  { id: 4, name: "Mango Sorbet", category: "Frozen", price: 199, emoji: "🥭", desc: "Fresh Alphonso mango churned into silky sorbet", rating: 4.7, tag: "Summer Hit" },
  { id: 5, name: "Gulab Jamun", category: "Indian", price: 149, emoji: "🍡", desc: "Soft milk dumplings soaked in rose cardamom syrup", rating: 4.8, tag: "Desi Fav" },
  { id: 6, name: "Cheesecake Slice", category: "American", price: 329, emoji: "🍰", desc: "New York style baked cheesecake with berry compote", rating: 4.7, tag: "Classic" },
  { id: 7, name: "Paan Kulfi", category: "Indian", price: 179, emoji: "🍦", desc: "Creamy kulfi with betel leaf and gulkand swirl", rating: 4.6, tag: "Unique" },
  { id: 8, name: "Waffle Stack", category: "Belgian", price: 279, emoji: "🧇", desc: "Crispy Belgian waffles with whipped cream & strawberries", rating: 4.8, tag: "Weekend Fav" },
  { id: 9, name: "Rasmalai", category: "Indian", price: 159, emoji: "🥛", desc: "Spongy cottage cheese discs in saffron milk", rating: 4.9, tag: "Royal" },
  { id: 10, name: "Profiteroles", category: "French", price: 259, emoji: "🍩", desc: "Choux pastry puffs filled with vanilla cream", rating: 4.6, tag: "Light" },
  { id: 11, name: "Dark Choco Mousse", category: "French", price: 229, emoji: "🍫", desc: "Airy Belgian chocolate mousse with candied orange peel", rating: 4.7, tag: "Decadent" },
  { id: 12, name: "Rose Phirni", category: "Indian", price: 139, emoji: "🌹", desc: "Chilled rice pudding flavored with rose and pistachios", rating: 4.5, tag: "Refreshing" },
];

const CATEGORIES = ["All", "French", "Italian", "Indian", "American", "Belgian", "Frozen"];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const injectStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cream: #FFF8F0;
      --warm-white: #FFFCF8;
      --caramel: #C8832A;
      --caramel-light: #E8A84A;
      --chocolate: #3D1C02;
      --choco-mid: #6B3A1F;
      --blush: #F4C5A8;
      --rose: #E8857A;
      --sage: #8BAF7A;
      --text-main: #2D1A0E;
      --text-soft: #8B6B55;
      --shadow: 0 4px 24px rgba(61,28,2,0.10);
      --shadow-lg: 0 12px 48px rgba(61,28,2,0.18);
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-main); }

    /* NAV */
    .nav {
      position: sticky; top: 0; z-index: 100;
      background: rgba(255,248,240,0.92); backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(200,131,42,0.15);
      padding: 0 2rem; display: flex; align-items: center; justify-content: space-between;
      height: 68px;
    }
    .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: var(--chocolate); cursor: pointer; letter-spacing: -0.5px; }
    .nav-logo span { color: var(--caramel); }
    .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
    .nav-btn { background: none; border: 1.5px solid rgba(200,131,42,0.3); color: var(--choco-mid); padding: 0.45rem 1.1rem; border-radius: 50px; font-size: 0.85rem; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; }
    .nav-btn:hover { background: var(--caramel); border-color: var(--caramel); color: white; }
    .nav-btn.active { background: var(--chocolate); border-color: var(--chocolate); color: white; }
    .cart-badge { background: var(--rose); color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 0.7rem; display: flex; align-items: center; justify-content: center; font-weight: 700; }

    /* HERO */
    .hero {
      background: linear-gradient(135deg, #3D1C02 0%, #6B3A1F 50%, #C8832A 100%);
      padding: 5rem 2rem; text-align: center; position: relative; overflow: hidden;
    }
    .hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
    .hero-tag { display: inline-block; background: rgba(232,168,74,0.25); border: 1px solid rgba(232,168,74,0.4); color: var(--caramel-light); padding: 0.3rem 1rem; border-radius: 50px; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1.2rem; }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; color: white; line-height: 1.1; margin-bottom: 1rem; }
    .hero h1 em { color: var(--caramel-light); font-style: italic; }
    .hero p { color: rgba(255,255,255,0.7); font-size: 1.05rem; max-width: 480px; margin: 0 auto 2rem; font-weight: 300; }
    .hero-cta { background: var(--caramel); color: white; border: none; padding: 0.9rem 2.5rem; border-radius: 50px; font-size: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.3s; box-shadow: 0 8px 32px rgba(200,131,42,0.4); }
    .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(200,131,42,0.5); }
    .hero-emojis { font-size: 3rem; margin-bottom: 1.5rem; }

    /* PRODUCTS PAGE */
    .page { max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
    .section-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--chocolate); }
    .section-title span { color: var(--caramel); }

    .cat-filters { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
    .cat-btn { background: white; border: 1.5px solid rgba(200,131,42,0.2); color: var(--choco-mid); padding: 0.4rem 1.1rem; border-radius: 50px; font-size: 0.82rem; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .cat-btn:hover, .cat-btn.active { background: var(--caramel); border-color: var(--caramel); color: white; }

    .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }

    .product-card {
      background: white; border-radius: 20px; overflow: hidden;
      box-shadow: var(--shadow); transition: all 0.3s; position: relative;
    }
    .product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
    .product-card-img { background: linear-gradient(135deg, #FFF0E0, #FFE0C0); padding: 2rem; text-align: center; font-size: 4rem; position: relative; }
    .product-tag { position: absolute; top: 0.75rem; left: 0.75rem; background: var(--chocolate); color: white; font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.65rem; border-radius: 50px; letter-spacing: 0.5px; }
    .product-body { padding: 1.25rem; }
    .product-cat { font-size: 0.72rem; color: var(--caramel); font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 0.4rem; }
    .product-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 700; color: var(--chocolate); margin-bottom: 0.4rem; }
    .product-desc { font-size: 0.82rem; color: var(--text-soft); line-height: 1.5; margin-bottom: 1rem; }
    .product-footer { display: flex; align-items: center; justify-content: space-between; }
    .product-price { font-size: 1.3rem; font-weight: 700; color: var(--chocolate); }
    .product-price sup { font-size: 0.75rem; }
    .product-rating { font-size: 0.8rem; color: var(--text-soft); margin-bottom: 0.75rem; }
    .product-rating span { color: #F59E0B; }
    .add-btn { background: var(--chocolate); color: white; border: none; padding: 0.55rem 1.25rem; border-radius: 50px; font-size: 0.85rem; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.35rem; }
    .add-btn:hover { background: var(--caramel); }
    .add-btn.added { background: var(--sage); }

    /* CART PAGE */
    .cart-page { max-width: 900px; margin: 0 auto; padding: 2.5rem 1.5rem; }
    .cart-empty { text-align: center; padding: 5rem 2rem; }
    .cart-empty .empty-emoji { font-size: 5rem; margin-bottom: 1.5rem; }
    .cart-empty h2 { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--chocolate); margin-bottom: 0.75rem; }
    .cart-empty p { color: var(--text-soft); margin-bottom: 2rem; }

    .cart-layout { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; align-items: start; }
    @media (max-width: 720px) { .cart-layout { grid-template-columns: 1fr; } }

    .cart-items { display: flex; flex-direction: column; gap: 1rem; }
    .cart-item { background: white; border-radius: 16px; padding: 1.25rem; display: flex; gap: 1rem; align-items: center; box-shadow: var(--shadow); }
    .cart-item-emoji { font-size: 2.5rem; width: 60px; text-align: center; flex-shrink: 0; background: #FFF0E0; border-radius: 12px; padding: 0.5rem; }
    .cart-item-info { flex: 1; }
    .cart-item-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 1rem; color: var(--chocolate); margin-bottom: 0.2rem; }
    .cart-item-cat { font-size: 0.75rem; color: var(--caramel); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; }
    .qty-controls { display: flex; align-items: center; gap: 0.5rem; }
    .qty-btn { background: #F5EDE4; border: none; width: 28px; height: 28px; border-radius: 8px; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; color: var(--chocolate); font-weight: 700; transition: background 0.2s; }
    .qty-btn:hover { background: var(--caramel); color: white; }
    .qty-num { font-weight: 600; font-size: 0.95rem; min-width: 20px; text-align: center; }
    .cart-item-price { font-weight: 700; font-size: 1.1rem; color: var(--chocolate); margin-left: auto; }
    .remove-btn { background: none; border: none; color: #ccc; cursor: pointer; font-size: 1.1rem; padding: 0.25rem; transition: color 0.2s; margin-left: 0.5rem; }
    .remove-btn:hover { color: var(--rose); }

    .order-summary { background: white; border-radius: 20px; padding: 1.75rem; box-shadow: var(--shadow); position: sticky; top: 88px; }
    .summary-title { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--chocolate); margin-bottom: 1.25rem; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--text-soft); }
    .summary-row.total { font-size: 1.15rem; font-weight: 700; color: var(--chocolate); margin-top: 1rem; padding-top: 1rem; border-top: 1.5px solid #F0E8E0; }
    .checkout-btn { width: 100%; background: linear-gradient(135deg, var(--chocolate), var(--choco-mid)); color: white; border: none; padding: 1rem; border-radius: 12px; font-size: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; margin-top: 1.25rem; transition: all 0.2s; }
    .checkout-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .free-delivery { text-align: center; font-size: 0.78rem; color: var(--sage); font-weight: 600; margin-top: 0.75rem; }

    /* LOGIN PAGE */
    .login-page { min-height: calc(100vh - 68px); display: flex; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(135deg, #FFF8F0 0%, #FFF0E0 100%); }
    .login-card { background: white; border-radius: 28px; padding: 3rem 2.5rem; max-width: 420px; width: 100%; box-shadow: var(--shadow-lg); }
    .login-icon { font-size: 3rem; text-align: center; margin-bottom: 0.75rem; }
    .login-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; color: var(--chocolate); text-align: center; margin-bottom: 0.4rem; }
    .login-sub { text-align: center; color: var(--text-soft); font-size: 0.9rem; margin-bottom: 2rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-label { display: block; font-size: 0.82rem; font-weight: 600; color: var(--choco-mid); margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.8px; }
    .form-input { width: 100%; border: 1.5px solid #E8D8C8; border-radius: 12px; padding: 0.8rem 1rem; font-size: 0.95rem; font-family: 'DM Sans', sans-serif; color: var(--text-main); background: #FFFCF8; transition: border-color 0.2s; outline: none; }
    .form-input:focus { border-color: var(--caramel); background: white; }
    .form-input::placeholder { color: #C4A882; }
    .login-btn { width: 100%; background: linear-gradient(135deg, var(--chocolate), var(--choco-mid)); color: white; border: none; padding: 1rem; border-radius: 12px; font-size: 1rem; font-family: 'DM Sans', sans-serif; font-weight: 600; cursor: pointer; margin-top: 0.5rem; transition: all 0.2s; }
    .login-btn:hover { opacity: 0.9; transform: translateY(-1px); }
    .login-divider { text-align: center; color: var(--text-soft); font-size: 0.85rem; margin: 1.25rem 0; position: relative; }
    .login-divider::before, .login-divider::after { content: ''; position: absolute; top: 50%; width: 42%; height: 1px; background: #E8D8C8; }
    .login-divider::before { left: 0; }
    .login-divider::after { right: 0; }
    .guest-btn { width: 100%; background: white; border: 1.5px solid #E8D8C8; color: var(--choco-mid); padding: 0.8rem; border-radius: 12px; font-size: 0.9rem; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .guest-btn:hover { border-color: var(--caramel); color: var(--caramel); }
    .error-msg { background: #FFF0EE; border: 1px solid #F4B8B0; border-radius: 10px; padding: 0.75rem 1rem; color: #C0392B; font-size: 0.85rem; margin-bottom: 1rem; text-align: center; }

    /* TOAST */
    .toast { position: fixed; bottom: 2rem; right: 2rem; background: var(--chocolate); color: white; padding: 0.85rem 1.5rem; border-radius: 12px; font-size: 0.9rem; font-weight: 500; box-shadow: var(--shadow-lg); z-index: 999; animation: slideUp 0.3s ease; display: flex; align-items: center; gap: 0.5rem; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* USER CHIP */
    .user-chip { display: flex; align-items: center; gap: 0.5rem; background: #FFF0E0; border-radius: 50px; padding: 0.35rem 0.75rem 0.35rem 0.35rem; }
    .user-avatar { width: 28px; height: 28px; background: var(--caramel); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 0.8rem; }
    .user-name { font-size: 0.82rem; font-weight: 600; color: var(--choco-mid); }

    /* ORDER SUCCESS */
    .order-success { text-align: center; padding: 4rem 2rem; }
    .order-success h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; color: var(--chocolate); margin: 1rem 0 0.75rem; }
    .order-success p { color: var(--text-soft); margin-bottom: 2rem; }
    .success-emoji { font-size: 5rem; animation: bounce 1s ease infinite alternate; }
    @keyframes bounce { to { transform: translateY(-12px); } }
  `;
  document.head.appendChild(style);
};

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ msg, onHide }) {
  useEffect(() => { const t = setTimeout(onHide, 2200); return () => clearTimeout(t); }, []);
  return <div className="toast">🛒 {msg}</div>;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage }) {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);
  const user = useSelector((s) => s.user);
  const totalItems = cart.reduce((a, i) => a + i.qty, 0);

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("home")}>
        Dessert<span>Cart</span> 🍮
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <div className="user-chip">
              <div className="user-avatar">{user.name[0].toUpperCase()}</div>
              <span className="user-name">{user.name}</span>
            </div>
            <button className="nav-btn" onClick={() => { dispatch({ type: LOGOUT }); setPage("home"); }}>Logout</button>
          </>
        ) : (
          <button className="nav-btn" onClick={() => setPage("login")}>Login</button>
        )}
        <button className="nav-btn active" onClick={() => setPage("cart")}>
          🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </div>
    </nav>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ item, showToast }) {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);
  const inCart = cart.find((i) => i.id === item.id);

  const handleAdd = () => {
    dispatch({ type: ADD_TO_CART, payload: item });
    showToast(`${item.name} added to cart!`);
  };

  return (
    <div className="product-card">
      <div className="product-card-img">
        {item.tag && <span className="product-tag">{item.tag}</span>}
        <div>{item.emoji}</div>
      </div>
      <div className="product-body">
        <div className="product-cat">{item.category}</div>
        <div className="product-name">{item.name}</div>
        <div className="product-rating"><span>★</span> {item.rating} · Handcrafted Daily</div>
        <div className="product-desc">{item.desc}</div>
        <div className="product-footer">
          <div className="product-price"><sup>₹</sup>{item.price}</div>
          <button className={`add-btn ${inCart ? "added" : ""}`} onClick={handleAdd}>
            {inCart ? `✓ In Cart (${inCart.qty})` : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ showToast }) {
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? DESSERTS : DESSERTS.filter((d) => d.category === cat);

  return (
    <>
      <div className="hero">
        <div className="hero-emojis">🍰 🍫 🧁</div>
        <div className="hero-tag">✦ Crafted with Love ✦</div>
        <h1>India's Finest<br /><em>Artisan Desserts</em></h1>
        <p>From silky French classics to beloved desi mithai — delivered fresh to your doorstep.</p>
        <button className="hero-cta" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>
          Explore Menu →
        </button>
      </div>
      <div className="page" id="menu">
        <div className="section-header">
          <div className="section-title">Our <span>Menu</span></div>
        </div>
        <div className="cat-filters">
          {CATEGORIES.map((c) => (
            <button key={c} className={`cat-btn ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
        <div className="products-grid">
          {filtered.map((item) => <ProductCard key={item.id} item={item} showToast={showToast} />)}
        </div>
      </div>
    </>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
function CartPage({ setPage, showToast }) {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s.cart);
  const user = useSelector((s) => s.user);
  const [ordered, setOrdered] = useState(false);

  const subtotal = cart.reduce((a, i) => a + i.price * i.qty, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const total = subtotal + delivery;

  const handleCheckout = () => {
    if (!user) { setPage("login"); showToast("Please login to place order"); return; }
    setOrdered(true);
    setTimeout(() => { dispatch({ type: CLEAR_CART }); setOrdered(false); setPage("home"); }, 3500);
  };

  if (ordered) return (
    <div className="cart-page">
      <div className="order-success">
        <div className="success-emoji">🎉</div>
        <h2>Order Placed!</h2>
        <p>Your desserts are being prepared with love, {user?.name}!<br />Expected in 35–45 minutes 🍮</p>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div className="cart-page">
      <div className="cart-empty">
        <div className="empty-emoji">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious desserts to get started!</p>
        <button className="hero-cta" onClick={() => setPage("home")}>Browse Menu</button>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div style={{ marginBottom: "1.75rem" }}>
        <div className="section-title">Your <span style={{ color: "var(--caramel)" }}>Cart</span></div>
        <div style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginTop: "0.3rem" }}>{cart.length} item{cart.length > 1 ? "s" : ""} · Ready to indulge?</div>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-emoji">{item.emoji}</div>
              <div className="cart-item-info">
                <div className="cart-item-cat">{item.category}</div>
                <div className="cart-item-name">{item.name}</div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => dispatch({ type: UPDATE_QTY, payload: { id: item.id, qty: item.qty - 1 } })}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => dispatch({ type: UPDATE_QTY, payload: { id: item.id, qty: item.qty + 1 } })}>+</button>
                </div>
              </div>
              <div className="cart-item-price">₹{item.price * item.qty}</div>
              <button className="remove-btn" onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: item.id })} title="Remove">✕</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <div className="summary-title">Order Summary</div>
          {cart.map((i) => (
            <div className="summary-row" key={i.id}>
              <span>{i.name} × {i.qty}</span>
              <span>₹{i.price * i.qty}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="summary-row"><span>Delivery</span><span style={{ color: delivery === 0 ? "var(--sage)" : "inherit" }}>{delivery === 0 ? "FREE" : `₹${delivery}`}</span></div>
          <div className="summary-row total"><span>Total</span><span>₹{total}</span></div>
          <button className="checkout-btn" onClick={handleCheckout}>
            {user ? "Place Order 🍮" : "Login to Checkout →"}
          </button>
          {subtotal < 499 && <div className="free-delivery">Add ₹{499 - subtotal} more for free delivery!</div>}
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage, showToast }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = () => {
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    if (isSignup && !form.name) { setError("Please enter your name."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const name = isSignup ? form.name : form.email.split("@")[0];
    dispatch({ type: SET_USER, payload: { name, email: form.email } });
    showToast(`Welcome, ${name}! 🎉`);
    setPage("cart");
  };

  const handleGuest = () => {
    dispatch({ type: SET_USER, payload: { name: "Guest", email: "guest@dessertcart.in" } });
    showToast("Browsing as Guest 👋");
    setPage("home");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🍰</div>
        <div className="login-title">{isSignup ? "Join Us" : "Welcome Back"}</div>
        <div className="login-sub">{isSignup ? "Create your DessertCart account" : "Sign in to place your order"}</div>
        {error && <div className="error-msg">⚠ {error}</div>}
        {isSignup && (
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input className="form-input" placeholder="e.g. Priya Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
        </div>
        <button className="login-btn" onClick={handleSubmit}>{isSignup ? "Create Account →" : "Sign In →"}</button>
        <div className="login-divider">or</div>
        <button className="guest-btn" onClick={handleGuest}>Continue as Guest</button>
        <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--text-soft)" }}>
          {isSignup ? "Already have an account? " : "New here? "}
          <span style={{ color: "var(--caramel)", fontWeight: 600, cursor: "pointer" }} onClick={() => { setIsSignup(!isSignup); setError(""); }}>
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("home");
  const [toast, setToast] = useState(null);

  useEffect(() => { injectStyles(); }, []);

  const showToast = (msg) => setToast(msg);

  return (
    <Provider store={store}>
      <InnerApp page={page} setPage={setPage} toast={toast} showToast={showToast} setToast={setToast} />
    </Provider>
  );
}

function InnerApp({ page, setPage, toast, showToast, setToast }) {
  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {page === "home" && <HomePage showToast={showToast} />}
      {page === "cart" && <CartPage setPage={setPage} showToast={showToast} />}
      {page === "login" && <LoginPage setPage={setPage} showToast={showToast} />}
      {toast && <Toast msg={toast} onHide={() => setToast(null)} />}
    </div>
  );
}

export default App;