import React, { useEffect } from "react";
import Product from "./product";
import Cart from "./cart";
import { store } from "./store";
import products from "./mocks/products";
import { CartItem } from "./types/types";
import { useUnit } from "effector-react";

const App: React.FC = () => {
  const validProducts = useUnit(store.$products);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise((resolve) => setTimeout(resolve));
      store.setProducts(products);
    };

    fetchProducts();
  }, []);

  const isProduct = (item: unknown): item is CartItem => {
    return (
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "name" in item &&
      "price" in item &&
      typeof (item as CartItem).id === "string" &&
      typeof (item as CartItem).name === "string" &&
      typeof (item as CartItem).price === "number"
    );
  };

  const filteredProducts = validProducts.filter(isProduct) as CartItem[];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Интернет-магазин</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
};

export default App;
