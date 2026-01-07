import { Link } from "react-router-dom";
import "./Tea.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Tea = () => {
  const [teaList, setTeaList] = useState([]);
  const [selectedTea, setSelectedTea] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);

  // 🔹 To‘lov modal state-lari
  const [showCardModal, setShowCardModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  // 🔹 Taymer state-lari
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minut

  useEffect(() => {
    axios
      .get("https://df9b5210b958a336.mokky.dev/kaa")
      .then((res) => setTeaList(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔹 Taymer ishlashi
  useEffect(() => {
    if (!showTimer) return;
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, timeLeft]);

  // 🔹 Buyurtma berish funksiyasi
  const handleOrder = () => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === selectedTea.id);
      if (existing) {
        return prev.map((o) =>
          o.id === selectedTea.id
            ? { ...o, quantity: o.quantity + quantity }
            : o
        );
      }
      return [...prev, { ...selectedTea, quantity }];
    });
    setSelectedTea(null);
    setQuantity(1);
  };

  const handleCancelOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleConfirmAll = () => {
    if (orders.length === 0) return;
    setShowCardModal(true);
  };

  const handleCancelAll = () => {
    setOrders([]);
  };

  const handlePay = () => {
    if (cardNumber.length !== 16) {
      alert("Plastik karta raqami 16 xonali bo‘lishi kerak!");
      return;
    }
    setShowCardModal(false);
    setShowResultModal(true);
  };

  const closeResultModal = () => {
    setShowResultModal(false);
    setOrders([]);
    setCardNumber("");
    setShowTimer(true);
    setTimeLeft(300);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="container">
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
        </nav>
      </header>

      {/* Main text */}
      <div className="boshi">
        <h1>
          Discover the world of
          <span className="highlight"> fine tea</span>
        </h1>
      </div>

      {/* Tea cards */}
      <div className="coffee-grid">
        {teaList.map((item) => (
          <div
            key={item.id}
            className="coffee-card"
            onClick={() => setSelectedTea(item)}
          >
            <img
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `https://df9b5210b958a336.mokky.dev${item.image}`
              }
              alt={item.title}
            />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="price">{`$${item.price.toFixed(2)}`}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tea order modal */}
      {selectedTea && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedTea.title}</h2>
            <img
              src={
                selectedTea.image.startsWith("http")
                  ? selectedTea.image
                  : `https://df9b5210b958a336.mokky.dev${selectedTea.image}`
              }
              alt={selectedTea.title}
            />
            <p>{selectedTea.description}</p>
            <p><strong>Price:</strong> ${selectedTea.price.toFixed(2)}</p>

            <div className="quantity">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="order-btn" onClick={handleOrder}>
              Buyurtma berish
            </button>
            <button
              className="close-btn"
              onClick={() => setSelectedTea(null)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Orders panel */}
      {orders.length > 0 && (
        <div className="orders-panel">
          <h3>Buyurtmalar:</h3>
          {orders.map((o) => (
            <div key={o.id} className="order-item">
              <span>{o.title}</span>
              <span>{o.quantity} ta</span>
              <button onClick={() => handleCancelOrder(o.id)}>X</button>
            </div>
          ))}

          <div className="order-all-buttons">
            <button onClick={handleConfirmAll}>
              Barchasini Buyurtma Qilish
            </button>
            <button onClick={handleCancelAll}>
              Barchasini Bekor Qilish
            </button>
          </div>
        </div>
      )}

      {/* Plastik karta modal */}
      {showCardModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>To‘lov</h2>
            <input
              className="card-input"
              maxLength={16}
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, ""))
              }
              placeholder="8600123456789012"
            />
            <button className="order-btn" onClick={handlePay}>
              Tasdiqlash
            </button>
            <button
              className="close-btn"
              onClick={() => setShowCardModal(false)}
            >
              X
            </button>
          </div>
        </div>
      )}

      {/* Natija modal */}
      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal result-modal">
            <h2>To‘lov muvaffaqiyatli!</h2>
            <p>
              <strong>Karta:</strong> {cardNumber}
            </p>

            {orders.map((o) => (
              <p key={o.id}>
                {o.title}: {o.quantity} ta
              </p>
            ))}

            <h3 className="success-text">Buyurtma qilindi ✅</h3>
            <button className="order-btn" onClick={closeResultModal}>
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Taymer panel */}
      {showTimer && (
        <div className="timer-panel">
          {timeLeft > 0 ? (
            <p>
              ⏳ Buyurtmangiz{" "}
              <strong>{formatTime(timeLeft)}</strong> daqiqa da tayyor bo‘ladi
            </p>
          ) : (
            <p className="ready-text">
              ☕ Buyurtmangiz tayyor, olib ketishingiz mumkin ✅
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tea;
