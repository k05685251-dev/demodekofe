import { Link, useLocation } from "react-router-dom";
import "./Coffee.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Coffee = () => {
  const location = useLocation();
  const discount = location.state?.discount || 0; // bonusdan kelgan chegirma

  const [coffeeList, setCoffeeList] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState([]);

  // To‘lov modal state
  const [showCardModal, setShowCardModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [cardNumber, setCardNumber] = useState("");

  // Taymer state
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 sekund

  useEffect(() => {
    axios
      .get("https://0d6f58056fd68097.mokky.dev/ka")
      .then((res) => setCoffeeList(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Taymer ishlashi
  useEffect(() => {
    if (!showTimer) return;
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer, timeLeft]);

// Narxni chegirma bilan hisoblash
const getDiscountedPrice = (price) => {
  const numericPrice = Number(price.replace(/\D/g, "")); // faqat raqam
  if (!discount) return `$${numericPrice.toLocaleString("en-US")}`; // chegirma yo‘q
  const discounted = numericPrice * (1 - discount / 100);
  return `$${discounted.toLocaleString("en-US")} (${discount}% chegirma!)`;
};


  // Buyurtma funksiyalari
  const handleOrder = () => {
    setOrders((prev) => {
      const existing = prev.find((o) => o.id === selectedCoffee.id);
      if (existing) {
        return prev.map((o) =>
          o.id === selectedCoffee.id
            ? { ...o, quantity: o.quantity + quantity }
            : o
        );
      }
      return [...prev, { ...selectedCoffee, quantity }];
    });

    setSelectedCoffee(null);
    setQuantity(1);
  };

  const handleCancelOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleConfirmAll = () => {
    if (orders.length === 0) return;
    setShowCardModal(true);
  };

  const handleCancelAll = () => setOrders([]);

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
    setTimeLeft(10);
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
          <Link to="/coffee" className="active">Coffee</Link>
          <Link to="/tea">Tea</Link>
          <Link to="/dessert">Dessert</Link>
           <Link to="/children">Children</Link>
          <Link to="/bonus">Bonus</Link>
         
        </nav>
      </header>

      {/* Main text */}
      <div className="boshi">
        <h1>
          Behind each of our cups hides an
          <span className="highlight"> amazing surprise</span>
        </h1>
      </div>

      {/* Coffee cards */}
      <div className="coffee-grid">
        {coffeeList.map((item) => (
          <div
            key={item.id}
            className="coffee-card"
            onClick={() => setSelectedCoffee(item)}
          >
            <img src={item.image} alt={item.name} />
            <div className="card-content">
              <h3>{item.name}</h3>
              <span className="price">{getDiscountedPrice(item.price)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Coffee order modal */}
      {selectedCoffee && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{selectedCoffee.name}</h2>
            <img src={selectedCoffee.image} alt={selectedCoffee.name} />
            <p>{selectedCoffee.description}</p>

            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <button className="order-btn" onClick={handleOrder}>Buyurtma berish</button>
            <button className="close-btn" onClick={() => setSelectedCoffee(null)}>X</button>
          </div>
        </div>
      )}

      {/* Orders panel */}
      {orders.length > 0 && (
        <div className="orders-panel">
          <h3>Buyurtmalar:</h3>
          {orders.map((o) => (
            <div key={o.id} className="order-item">
              <span>{o.name}</span>
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
            <input
              className="card-input"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="8600123456789012"
            />
            <button className="order-btn" onClick={handlePay}>Tasdiqlash</button>
            <button className="close-btn" onClick={() => setShowCardModal(false)}>X</button>
          </div>
        </div>
      )}

      {/* Natija modal */}
      {showResultModal && (
        <div className="modal-overlay">
          <div className="modal result-modal">
            <h2>To‘lov muvaffaqiyatli!</h2>
            <p><strong>Karta:</strong> {cardNumber}</p>
            {orders.map((o) => (
              <p key={o.id}>{o.name}: {o.quantity} ta</p>
            ))}
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
            <div className="socials">
              <span>🐦</span>
              <span>📸</span>
              <span>📘</span>
            </div>
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

export default Coffee;
