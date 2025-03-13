import { createEvent } from 'effector';
import { store } from '../src/store';
import { CartItem, Product } from '../src/types';

describe('Функционал Effector стора', () => {
  const resetStore = createEvent();

  beforeEach(() => {
    store.$cart.on(resetStore, () => []);
    store.$products.on(resetStore, () => []);
    resetStore();
  });

  test('setProducts устанавливает список продуктов', () => {
    const products: Product[] = [{ id: '1', name: 'Test Product', price: 100 }];

    store.setProducts(products);

    expect(store.$products.getState()).toEqual(products);
  });

  test('addToCart добавляет товар в корзину', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };

    store.addToCart(product);

    expect(store.$cart.getState()).toEqual([{ ...product, quantity: 1 }]);
  });

  test('addToCart увеличивает количество, если товар уже есть в корзине', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };

    store.addToCart(product);
    store.addToCart(product);

    expect(store.$cart.getState()[0].quantity).toBe(2);
  });

  test('increaseQuantity увеличивает количество товара', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };

    store.addToCart(product);
    store.increaseQuantity(product.id);

    expect(store.$cart.getState()[0].quantity).toBe(2);
  });

  test('decreaseQuantity уменьшает количество товара', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 2,
    };

    store.addToCart(product);
    store.increaseQuantity(product.id);
    store.decreaseQuantity(product.id);

    expect(store.$cart.getState()[0].quantity).toBe(1);
  });

  test('decreaseQuantity не уменьшает количество ниже 1', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };

    store.addToCart(product);
    store.decreaseQuantity(product.id);
    store.decreaseQuantity(product.id);

    expect(store.$cart.getState()[0].quantity).toBe(1);
  });

  test('removeFromCart удаляет товар из корзины', () => {
    const product: CartItem = {
      id: '1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
    };

    store.addToCart(product);
    store.removeFromCart(product.id);

    expect(store.$cart.getState()).toEqual([]);
  });
});
