import React from "react";
import { Link } from "react-router-dom";
import "./Bonus.css";

const Bonus = () => {
  return (
    <>
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

      <div className="bonus-wrapper">
        {/* Pastdagi tugmalar */}
        <div className="bonus-buttons">
          <Link
            to="/coffee"
            className="bonus-btn"
            state={{ discount: 20 }} // 20% chegirma
          >
            Coffee <span className="discount-tag">20% OFF</span>
          </Link>

          <Link
            to="/tea"
            className="bonus-btn"
            state={{ discount: 10 }} // 10% chegirma
          >
            Tea <span className="discount-tag">10% OFF</span>
          </Link>

          <Link
            to="/dessert"
            className="bonus-btn"
            state={{ discount: 30 }} // 30% chegirma
          >
            Dessert <span className="discount-tag">30% OFF</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Bonus;
