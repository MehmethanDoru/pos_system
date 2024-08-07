import "./App.css";
import Header from "./components/header/header";
import Categories from "./components/cetegories/categories";

function App() {
  return (
    <div className="body">
      <Header />
      <div className="home px-6 flex justify-between gap-10">
        <div className="categories flex-[0.9] overflow-auto max-h-[calc(100vh-_-115px)] pb-72">
          <Categories />
        </div>
        <div className="products flex-[8]">
          <div className="">products</div>
        </div>
        <div className="">
          <div>cart totals</div>
        </div>
      </div>
    </div>
  );
}

export default App;
