import { useEffect, useState } from "react";
import axios from "axios";
import "./Menyu.css";

const Menyu = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://68978701eeca2e01.mokky.dev/menyu")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API dan ma'lumot olinmadi:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Yuklanmoqda...</p>;

  return (
    <div className="menyu-page">
      <h1>Menyu sahifasi ☕</h1>
      <a href="/">⬅ Home</a>

      <div className="menyu-list">
        {data.length > 0 ? (
          data.map(item => (
            <div key={item.id} className="menyu-item">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="menyu-img"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150"; // agar rasm yuklanmasa placeholder
                  }}
                />
              )}
              <div className="content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.price && <p className="price">${item.price}</p>}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Menyu bo‘sh</p>
        )}
      </div>
    </div>
  );
};

export default Menyu;
