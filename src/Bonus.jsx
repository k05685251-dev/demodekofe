import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Bonus.css";

const VALID_CODES = [
  "KK0077","KK0088","KK0099","KK0100","KK0111",
  "KK0122","KK0133","KK0144","KK0155","KK0166"
];

const Bonus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasAccess, setHasAccess] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [inputCode, setInputCode] = useState("");

  const fromPage = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (VALID_CODES.includes(inputCode)) {
      setHasAccess(true);
      setShowModal(false);
    } else {
      alert("Promo kod noto‘g‘ri ❌");
    }
  };

  const handleClose = () => navigate(fromPage);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <h1 className="title">
          <img src="/logo.png" alt="Logo" />
        </h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/coffee">Coffee</Link>
          <Link to="/tea">Tea</Link>
          <Link to="/dessert">Dessert</Link>
          <Link to="/children">Children</Link>
          <Link to="/bonus" className="active">Bonus</Link>
        </nav>
      </header>

      <div className="bonus-wrapper">
        {/* MODAL */}
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

        {/* BONUS BUTTONS */}
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

            <Link to="/children" className="bonus-btn" state={{ discount: 15 }}>
              Children <span className="discount-tag">15% OFF</span>
            </Link>

            {/* 🆕 MA’LUMOT TUGMASI */}
            <Link to="/info" className="bonus-btn info-btn">
              Ma’lumot ℹ️
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Bonus;
