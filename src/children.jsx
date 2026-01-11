import { Link, useLocation } from "react-router-dom";
import "./children.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Children = () => {
  const location = useLocation();
  const discount = location.state?.discount || 0;

  const [kidsList, setKidsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);

  const [showCardModal, setShowCardModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  /* ===== DATA FETCH ===== */
  useEffect(() => {
    axios
      .get("https://6f32d761f3987094.mokky.dev/w")
      .then((res) => {
        setKidsList(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ===== TIMER ===== */
  useEffect(() => {
    if (!showTimer || timeLeft === 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [showTimer, timeLeft]);

  /* ===== PRICE WITH DISCOUNT ===== */
  const getPrice = (price) => {
    if (discount > 0) {
      return (price * (1 - discount / 100)).toFixed(2);
    }
    return price.toFixed(2);
  };

  /* ===== ORDER ===== */
  const handleOrder = () => {
    setOrders((prev) => {
      const exist = prev.find((o) => o.id === selectedItem.id);
      if (exist) {
        return prev.map((o) =>
          o.id === selectedItem.id
            ? { ...o, quantity: o.quantity + quantity }
            : o
        );
      }
      return [...prev, { ...selectedItem, quantity }];
    });
    setSelectedItem(null);
    setQuantity(1);
  };

  const cancelOrder = (id) =>
    setOrders((prev) => prev.filter((o) => o.id !== id));

  const confirmAll = () => orders.length && setShowCardModal(true);
  const cancelAll = () => setOrders([]);

  /* ===== PAY ===== */
  const handlePay = () => {
    if (cardNumber.length !== 16) {
      alert("Plastik karta raqami 16 xonali bo‘lishi kerak!");
      return;
    }
    setShowCardModal(false);
    setShowResultModal(true);
  };

  const closeResult = () => {
    setShowResultModal(false);
    setOrders([]);
    setCardNumber("");
    setShowTimer(true);
    setTimeLeft(300);
  };

  const formatTime = (sec) =>
    `${Math.floor(sec / 60)}:${sec % 60 < 10 ? "0" : ""}${sec % 60}`;

  return (
    <div className="container">
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
          <Link to="/children" className="active">Children</Link>
          <Link to="/bonus">Bonus</Link>
        </nav>
      </header>

      {/* GRID */}
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <div className="children-grid">
          {kidsList.slice(0, 16).map((item) => (
            <div
              key={item.id}
              className="children-card"
              onClick={() => setSelectedItem(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => (e.target.src = "/no-image.png")}
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="price">${getPrice(Number(item.price))}</span>
            </div>
          ))}
        </div>
      )}

      {/* ITEM MODAL */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedItem.title}</h2>
            <img src={selectedItem.image} alt="" />
            <p>{selectedItem.description}</p>
            <p><strong>${getPrice(Number(selectedItem.price))}</strong></p>

            <div className="quantity">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button className="order-btn" onClick={handleOrder}>
              Buyurtma berish
            </button>
            <button className="close-btn" onClick={() => setSelectedItem(null)}>
              X
            </button>
          </div>
        </div>
      )}

      {/* ORDERS PANEL */}
      {orders.length > 0 && (
        <div className="orders-panel">
          <h3>Buyurtmalar:</h3>

          {orders.map((o) => (
            <div key={o.id} className="order-item">
              <span>{o.title}</span>
              <span>{o.quantity} ta</span>
              <button onClick={() => cancelOrder(o.id)}>X</button>
            </div>
          ))}

          <div className="order-all-buttons">
            <button onClick={confirmAll}>Barchasini Buyurtma Qilish</button>
            <button onClick={cancelAll}>Barchasini Bekor Qilish</button>
          </div>
        </div>
      )}

      {/* CARD MODAL */}
      {showCardModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>To‘lov</h2>
            <input
              className="card-input"
              maxLength={16}
              placeholder="8600123456789012"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, ""))
              }
            />
            <button className="order-btn" onClick={handlePay}>Tasdiqlash</button>
            <button className="close-btn" onClick={() => setShowCardModal(false)}>X</button>
          </div>
        </div>
      )}

      {/* RESULT MODAL */}
      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal result-modal">
            <h2>To‘lov muvaffaqiyatli!</h2>
            <p><strong>Karta:</strong> {cardNumber}</p>

            {orders.map((o) => (
              <p key={o.id}>{o.title}: {o.quantity} ta</p>
            ))}

            <h3 className="success-text">Buyurtma qilindi ✅</h3>
            <button className="order-btn" onClick={closeResult}>Yopish</button>
          </div>
        </div>
      )}

      {/* TIMER */}
      {showTimer && (
        <div className="timer-panel">
          {timeLeft > 0 ? (
            <p>⏳ Buyurtma <strong>{formatTime(timeLeft)}</strong> daqiqada tayyor</p>
          ) : (
            <p className="ready-text">🍭 Buyurtma tayyor ✅</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Children;
