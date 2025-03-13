import React from 'react';
import { useUnit } from 'effector-react';
import { store } from './store';
import './css/cart.css';
import { CartItem } from './types';

const Cart: React.FC = () => {
  const cart = useUnit(store.$cart);

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item: CartItem) => (
            <li key={item.id} className="cart-item">
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} Рублей</span>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => store.decreaseQuantity(item.id)}
                  className="quantity-button"
                >
                  -
                </button>
                <span className="item-quantity">{item.quantity}</span>
                <button
                  onClick={() => store.increaseQuantity(item.id)}
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => store.removeFromCart(item.id)}
                className="remove-button"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
