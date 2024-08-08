import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import CartPage from "./pages/CartPage";
import StatisticsPage from "./pages/StatisticsPage";
import CustomerPage from "./pages/CustomersPage";
import BillsPage from "./pages/BillsPage";
import Header from "./components/header/header";
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/bills" element={<BillsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
