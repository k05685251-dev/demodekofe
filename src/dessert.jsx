import { Link, useLocation } from "react-router-dom";
import "./dessert.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Dessert = () => {
  const location = useLocation();
  const discount = location.state?.discount || 0; // Bonusdan kelgan chegirma

  const [dessertList, setDessertList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDessert, setSelectedDessert] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);

  const [showCardModal, setShowCardModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minut

  useEffect(() => {
    axios
      .get("https://aa39278071ae2c99.mokky.dev/des")
      .then((res) => { setDessertList(res.data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  // Taymer ishlashi
  useEffect(() => {
    if (!showTimer || timeLeft === 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [showTimer, timeLeft]);

  // Narxni chegirma bilan hisoblash
  const getPrice = (price) => discount ? (price * (1 - discount / 100)).toFixed(2) : price.toFixed(2);

  const handleOrder = () => {
    setOrders(prev => {
      const existing = prev.find(o => o.id === selectedDessert.id);
      if (existing) return prev.map(o => o.id === selectedDessert.id ? { ...o, quantity: o.quantity + quantity } : o);
      return [...prev, { ...selectedDessert, quantity }];
    });
    setSelectedDessert(null);
    setQuantity(1);
  };

  const handleCancelOrder = id => setOrders(prev => prev.filter(o => o.id !== id));
  const handleConfirmAll = () => orders.length && setShowCardModal(true);
  const handleCancelAll = () => setOrders([]);
  const handlePay = () => {
    if (cardNumber.length !== 16) return alert("Plastik karta raqami 16 xonali bo‘lishi kerak!");
    setShowCardModal(false);
    setShowResultModal(true);
  };
  const closeResultModal = () => { setShowResultModal(false); setOrders([]); setCardNumber(""); setShowTimer(true); setTimeLeft(300); };
  const formatTime = sec => `${Math.floor(sec / 60)}:${sec % 60 < 10 ? "0" : ""}${sec % 60}`;

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <h1 className="title"><img src="/logo.png" alt="Logo" /></h1>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/coffee">Coffee</Link>
          <Link to="/tea">Tea</Link>
          <Link to="/dessert" className="active">Dessert</Link>
          <Link to="/bonus">Bonus</Link>
        </nav>
      </header>

      {/* TITLE */}
      <div className="boshi">
        <h1>Sweet moments start with a <span className="highlight">delicious dessert</span></h1>
      </div>

      {/* DESSERT GRID */}
      {loading ? (
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      ) : (
        <div className="coffee-grid">
          {dessertList.length === 0 ? (
            <p style={{ textAlign: "center" }}>Dessert topilmadi</p>
          ) : dessertList.map(item => (
            <div key={item.id} className="coffee-card" onClick={() => setSelectedDessert(item)}>
              <img src={item.image} alt={item.title} onError={(e) => e.target.src="/no-image.png"} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="price">${getPrice(Number(item.price))}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Modal */}
      {selectedDessert && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedDessert.title}</h2>
            <img src={selectedDessert.image} alt={selectedDessert.title} />
            <p>{selectedDessert.description}</p>
            <p><strong>Price:</strong> ${getPrice(Number(selectedDessert.price))}</p>

            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="order-btn" onClick={handleOrder}>Buyurtma berish</button>
            <button className="close-btn" onClick={() => setSelectedDessert(null)}>X</button>
          </div>
        </div>
      )}

      {/* Orders Panel */}
      {orders.length > 0 && (
        <div className="orders-panel">
          <h3>Buyurtmalar:</h3>
          {orders.map(o => (
            <div key={o.id} className="order-item">
              <span>{o.title}</span>
              <span>{o.quantity} ta</span>
              <button onClick={() => handleCancelOrder(o.id)}>X</button>
            </div>
          ))}
          <div className="order-all-buttons">
            <button onClick={handleConfirmAll}>Barchasini Buyurtma Qilish</button>
            <button onClick={handleCancelAll}>Barchasini Bekor Qilish</button>
          </div>
        </div>
      )}

      {/* Plastik karta modal */}
      {showCardModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>To‘lov</h2>
            <input className="card-input" maxLength={16} placeholder="8600123456789012"
              value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))} />
            <button className="order-btn" onClick={handlePay}>Tasdiqlash</button>
            <button className="close-btn" onClick={() => setShowCardModal(false)}>X</button>
          </div>
        </div>
      )}

      {/* Natija Modal */}
      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal result-modal">
            <h2>To‘lov muvaffaqiyatli!</h2>
            <p><strong>Karta:</strong> {cardNumber}</p>
            {orders.map(o => <p key={o.id}>{o.title}: {o.quantity} ta</p>)}
            <h3 className="success-text">Buyurtma qilindi ✅</h3>
            <button className="order-btn" onClick={closeResultModal}>Yopish</button>
          </div>
        </div>
      )}

      {/* Taymer panel */}
      {showTimer && (
        <div className="timer-panel">
          {timeLeft > 0 ? (
            <p>⏳ Buyurtmangiz <strong>{formatTime(timeLeft)}</strong> daqiqa da tayyor bo‘ladi</p>
          ) : (
            <p className="ready-text">☕ Buyurtmangiz tayyor, olib ketishingiz mumkin ✅</p>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h2>Sip, Savor, Smile.</h2>
            <p>It’s coffee time!</p>
            <div className="socials"><span>🐦</span><span>📸</span><span>📘</span></div>
          </div>
          <div className="footer-right">
            <h3>Contact us</h3>
            <p>📍 8558 Green Rd., LA</p>
            <p>📞 +1 (603) 555-0123</p>
            <p>⏰ Mon-Sat: 9:00 AM – 23:00 PM</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dessert;
