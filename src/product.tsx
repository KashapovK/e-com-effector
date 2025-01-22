import React from "react";
import { store } from "./store"; // Импортируем store из Effector
import "./css/product.css";
import { CartItem } from "./types";

interface ProductProps {
  product: CartItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const handleAddToCart = () => {
    store.addToCart(product);
  };

  return (
    <div className="product-card">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">Цена: {product.price} Рублей</p>
      <button className="add-to-cart-button" onClick={handleAddToCart}>
        Добавить в корзину
      </button>
    </div>
  );
};

export default Product;
