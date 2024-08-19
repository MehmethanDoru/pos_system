import Categories from "../components/cetegories/categories";
import Products from "../components/products/products";
import Cart from "../components/cart/cart";
import { useState } from "react";

const HomePage = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="body">
      <div className="home px-6 flex flex-col md:flex-row justify-between gap-10">
        <div className="categories overflow-auto max-h-[calc(100vh-_-115px)] md:pb-72 transition-all">
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh-_-115px)] transition-all md:pb-72">
          <Products searchTerm={searchTerm} selectedCategory={selectedCategory} />
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] mb-14 md:mb-0 md:-mt-[24px] border">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
