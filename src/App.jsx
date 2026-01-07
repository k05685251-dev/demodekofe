import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Coffee from "./Coffee.jsx";
import Tea from "./Tea.jsx";
import Dessert from "./Dessert.jsx";
import Menyu from "./Menyu.jsx"; // 👈 SHU YO‘Q EDI

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/menyu" element={<Menyu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
