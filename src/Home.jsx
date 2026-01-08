import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  /* ===== AUTH ===== */
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
  });

  /* ===== DATA ===== */
  const [kino, setKino] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* ===== ORDER ===== */
  const [count, setCount] = useState(0);
  const price = 5.5;
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("none");

  /* ===== CANCEL ===== */
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  /* ===== THEME ===== */
  const [darkMode, setDarkMode] = useState(false);

  /* ===== EFFECT ===== */
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const registered = localStorage.getItem("isRegistered");
    const storedTheme = localStorage.getItem("darkMode");

    if (storedUser && registered === "true") {
      setFormData(JSON.parse(storedUser));
      setIsRegistered(true);
    }

    if (storedTheme === "true") setDarkMode(true);

    axios
      .get("https://0d6f58056fd68097.mokky.dev/a")
      .then((res) => setKino(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* ===== HANDLERS ===== */
  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    localStorage.setItem("userData", JSON.stringify(newData));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.gender) return alert("Jinsni tanlang");

    setIsRegistered(true);
    localStorage.setItem("isRegistered", "true");
    localStorage.setItem("userData", JSON.stringify(formData));
  };

  const handleLogout = () => {
    setIsRegistered(false);
    localStorage.clear();
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % kino.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + kino.length) % kino.length);

  const handleOrderClick = () => {
    if (count === 0) return alert("Mahsulot sonini tanlang");
    setShowAddress(true);
  };

  const confirmOrder = () => {
    if (!address.trim()) return alert("Manzil kiriting");
    setOrderStatus("ordered");
    setShowAddress(false);
    setCount(0);
  };

  const cancelOrder = () => {
    setOrderStatus("canceled");
    setShowCancelModal(false);
    setCancelReason("");
    setCustomReason("");
    setAddress("");
  };

  const closeModal = () => setShowCancelModal(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  /* ===== REGISTER PAGE ===== */
  if (!isRegistered) {
    return (
      <div className={`register-page ${darkMode ? "dark" : ""}`}>
        
        <form className="register-box" onSubmit={handleRegister}>
          <h2>Ro'yxatdan o'tish</h2>

          <div className="gender-box">
            <div
              className={`gender ${formData.gender === "male" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, gender: "male" })}
            >
              👦 O‘g‘il
            </div>
            <div
              className={`gender ${formData.gender === "female" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, gender: "female" })}
            >
              👧 Qiz
            </div>
          </div>

          <input name="name" placeholder="Ism" onChange={handleChange} required />
          <input name="surname" placeholder="Familiya" onChange={handleChange} required />
          <input name="phone" placeholder="Telefon" onChange={handleChange} required />
          <input name="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Parol" onChange={handleChange} required />

          <button type="submit">Kirish</button>
        </form>
      </div>
    );
  }

  /* ===== MAIN PAGE ===== */
  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      {/* THEME TOGGLE */}
<div className="theme-toggle-wrapper">
  <button className="theme-toggle" onClick={toggleTheme}>
    {darkMode ? "🌞 Light" : "🌙 Dark"}
  </button>
</div>


      {/* ===== HEADER ===== */}
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <img src="/logo.png" alt="Logo" />
        </div>

        <div className="nav-wrapper">
          <nav className="nav">
            <Link to="/" className="active">Home</Link>
            <Link to="/coffee">Coffee</Link>
            <Link to="/tea">Tea</Link>
            <Link to="/dessert">Dessert</Link>
            <Link to="/bonus">Bonus</Link>
          </nav>
        </div>

        <div className="user-wrapper">
          <div className="user-check">
            <div className="user-avatar">{formData.gender === "male" ? "👦" : "👧"}</div>
            <div className="user-info">
              <h3>{formData.name} {formData.surname}</h3>
              <p>{formData.email}</p>
            </div>
            <div className="logout-wrapper">
              <button onClick={handleLogout}>Chiqish</button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== HERO ===== */}
      <div className="hero-wrapper">
        <div className="hero">
          <div className="hero-image-wrapper">
            <img src="f324bd18c8eddb5caed23bba7b8523eb9aea9192.png" alt="Hero" />
          </div>
          <div className="hero-overlay">
            <div className="hero-text-wrapper">
              <h1>
                <span>Enjoy</span> premium <br />
                coffee at our <br />
                charming cafe
              </h1>
              <p>
                With its inviting atmosphere and delicious coffee options,
                the Coffee House Resource is a popular destination.
              </p>
            </div>
            <div className="hero-btn-wrapper">
             <Link to="/menyu">
               <button className="menu-btn">Menu</button>
             </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== PRODUCT ===== */}
      <div className="product-wrapper">
        <div className="image-wrapper">
          <div className="image-area">
            <button className="arrow left" onClick={prevImage}>◀</button>

           <div className="main-image-wrapper">
  <h1>Choose your favorite coffee</h1>
  <img className="hero-img1" src="/i.png" alt="Coffee" />
</div>
<div class="coffee-info">
  <h3 class="coffee-title">S’mores Frappuccino</h3>

  <p class="coffee-desc">
    This new drink takes an espresso and mixes it with brown
    sugar and cinnamon before being topped with oat milk.
  </p>

  <span class="coffee-price">$5.50</span>
</div>


            <button className="arrow right" onClick={nextImage}>▶</button>
          </div>
        </div>

        <div className="k1"><img className="hero-img2" src="/images.png" alt="" /></div>
        <div className="k2"><img className="hero-img3" src="/mobile-screens.png" alt="" /></div>
        <div className="k3"><img className="hero-img4" src="/contacts.png" alt="" /></div>

        {/* COUNTER */}
        <div className="counter-wrapper">
          <div className="counter">
            <button onClick={() => setCount(Math.max(0, count - 1))}>−</button>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button className="delete-btn" onClick={() => setCount(0)}>Delete</button>
            <h2>Total: ${(price * count).toFixed(2)}</h2>
          </div>
        </div>

        {/* ORDER */}
        <div className="order-wrapper">
          <div className="order-section">
            {orderStatus === "none" && !showAddress && (
              <button className="order-btn" onClick={handleOrderClick}>Buyurtma qilish</button>
            )}

            {showAddress && (
              <div className="address-box">
                <input
                  placeholder="Uy manzili"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={confirmOrder}>Tasdiqlash</button>
              </div>
            )}

            {orderStatus === "ordered" && (
              <>
                <h2 className="ordered-text">Buyurtma qilindi ✅</h2>
                <button className="order-btn" onClick={() => setShowCancelModal(true)}>Bekor qilish</button>
              </>
            )}

            {orderStatus === "canceled" && (
              <h2 className="ordered-text">Buyurtma bekor qilindi ✅</h2>
            )}
          </div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {showCancelModal && (
        <div className="modal-wrapper">
          <div className="modal-overlay">
            <div className="modal">
              <h2>Buyurtmani bekor qilish</h2>

              <div className="cancel-reasons">
                {["Kech yetkazib berildi","Narxi qimmat","Fikrimi o‘zgartirdim","other"].map(reason => (
                  <label key={reason}>
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={cancelReason === reason}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    {reason === "other" ? "Boshqa sabab" : reason}
                  </label>
                ))}

                {cancelReason === "other" && (
                  <input
                    type="text"
                    placeholder="Sababni yozing..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                  />
                )}
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={closeModal}>Ortga</button>
                <button className="continue-btn" onClick={cancelOrder}>Buyurtmani bekor qilish</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
