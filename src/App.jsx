import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./Components/Table";
import Company from "./Components/Company";
import Error from "./Components/Error";
import Products from "./Components/Products";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/company/:ticker" element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
