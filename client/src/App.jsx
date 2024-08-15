import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import CartPage from "./pages/CartPage";
import StatisticsPage from "./pages/StatisticsPage";
import CustomerPage from "./pages/CustomersPage";
import BillsPage from "./pages/BillsPage";
import ProductsPage from "./pages/ProductsPage";
import Header from "./components/header/header";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HomePage />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <CartPage />
            </>
          }
        />
        <Route
          path="/statistics"
          element={
            <>
              <Header />
              <StatisticsPage />
            </>
          }
        />
        <Route
          path="/customer"
          element={
            <>
              <Header />
              <CustomerPage />
            </>
          }
        />
        <Route
          path="/bills"
          element={
            <>
              <Header />
              <BillsPage />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header />
              <ProductsPage />
            </>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
