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
import PrivateRoutes from "./PrivateRoutes";

function App() {
  const isAuthenticated = !!localStorage.getItem("user");
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Header />
              <HomePage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoutes>
              <Header />
              <CartPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/statistics"
          element={
            <PrivateRoutes>
              <Header />
              <StatisticsPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/customer"
          element={
            <PrivateRoutes>
              <Header />
              <CustomerPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/bills"
          element={
            <PrivateRoutes>
              <Header />
              <BillsPage />
            </PrivateRoutes>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoutes>
              <Header />
              <ProductsPage />
            </PrivateRoutes>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
