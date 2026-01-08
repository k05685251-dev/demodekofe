import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Bonus.css";

// Promo kodlar ro'yxati
const VALID_CODES = [
  "KK0077",
  "KK0088",
  "KK0099",
  "KK0100",
  "KK0111",
  "KK0122",
  "KK0133",
  "KK0144",
  "KK0155",
  "KK0166"
];

const Bonus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasAccess, setHasAccess] = useState(false); // Promo kod to'g'ri bo'lsa
  const [showModal, setShowModal] = useState(true); // Modal oynani ko'rsatish
  const [inputCode, setInputCode] = useState(""); // Input qiymati

  // Qaysi sahifadan kelganini aniqlash
  const fromPage = location.state?.from || "/"; // default Home

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (VALID_CODES.includes(inputCode)) {
      setHasAccess(true);
      setShowModal(false);
    } else {
      alert("Kod noto‘g‘ri 😢");
    }
  };

  // Modalni yopish tugmasi
  const handleClose = () => {
    navigate(fromPage); // foydalanuvchi kelgan sahifaga qaytadi
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <h1 className="title">
          <img src="/logo.png" alt="Logo" />
        </h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/coffee">Coffee</Link>
          <Link to="/tea">Tea</Link>
          <Link to="/dessert">Dessert</Link>
          <Link to="/bonus" className="active">Bonus</Link>
        </nav>
      </header>

      {/* Bonus wrapper */}
      <div className="bonus-wrapper">

        {/* Promo kod modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Promo kod kiriting</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
          
                />
                <button type="submit">Tasdiqlash</button>
              </form>
              <button className="close-btn" onClick={handleClose}>
                Chiqish
              </button>
            </div>
          </div>
        )}

        {/* Bonus tugmalari */}
        {hasAccess && (
          <div className="bonus-buttons">
            <Link to="/coffee" className="bonus-btn" state={{ discount: 20 }}>
              Coffee <span className="discount-tag">20% OFF</span>
            </Link>
            <Link to="/tea" className="bonus-btn" state={{ discount: 10 }}>
              Tea <span className="discount-tag">10% OFF</span>
            </Link>
            <Link to="/dessert" className="bonus-btn" state={{ discount: 30 }}>
              Dessert <span className="discount-tag">30% OFF</span>
            </Link>
            {/* Yangi “Ma’lumotlar” tugmasi */}
            <Link to="/info" className="bonus-btn">
              Ma’lumotlar ℹ️
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Bonus;
