import "./App.css";
import Header from "./components/header/header";
import Categories from "./components/cetegories/categories";
import Products from "./components/products/products";

function App() {
  return (
    <div className="body">
      <Header />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories flex-[0.9] overflow-auto max-h-[calc(100vh-_-115px)] pb-72 transition-all">
          <Categories />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh-_-115px)] pb-72 transition-all">
          <Products />
        </div>
        <div className="">
          <div>cart totals</div>
        </div>
      </div>
    </div>
  );
}

export default App;
