import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { DESSERTS, CATEGORIES } from "../../data/desserts";

const HomePage = ({ showToast }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? DESSERTS
      : DESSERTS.filter((d) => d.category === activeCategory);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="hero">
        <div className="hero-emojis">🍰 🍫 🧁</div>
        <div className="hero-tag">✦ Crafted with Love ✦</div>
        <h1>
          India's Finest<br />
          <em>Artisan Desserts</em>
        </h1>
        <p>From silky French classics to beloved desi mithai — delivered fresh to your doorstep.</p>
        <button
          className="hero-cta"
          onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
        >
          Explore Menu →
        </button>
      </div>

      {/* ── Menu ─────────────────────────────────────────────────────────── */}
      <div className="page" id="menu">
        <div className="section-header">
          <div className="section-title">Our <span>Menu</span></div>
        </div>

        {/* Category Filters */}
        <div className="cat-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`cat-btn ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="products-grid">
          {filtered.map((item) => (
            <ProductCard key={item.id} item={item} showToast={showToast} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;