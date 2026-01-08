import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bonus from "./Bonus";
import Info from "./Info";
import Coffee from "./Coffee";
import Tea from "./Tea";
import Dessert from "./dessert";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee" element={<Coffee />} />
        <Route path="/tea" element={<Tea />} />
        <Route path="/dessert" element={<Dessert />} />
        <Route path="/bonus" element={<Bonus />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
