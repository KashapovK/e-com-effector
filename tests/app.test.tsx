import { render, screen, waitFor } from '@testing-library/react';
import { assert } from 'chai';
import App from '../src/app';
import { fork, allSettled } from 'effector';
import { store } from '../src/store';
import { Product } from '../src/types';
import { Provider } from 'effector-react';

describe('App Component', () => {
  test('рендерит карточки продуктов после загрузки', async () => {
    const mockProducts: Product[] = [
      { id: '1', name: 'Test Product', price: 100 },
      { id: '2', name: 'Another Product', price: 200 },
    ];

    const scope = fork();

    await allSettled(store.setProducts, { scope, params: mockProducts });

    render(
      <Provider value={scope}>
        <App />
      </Provider>,
    );

    assert.exists(screen.getByText(/Интернет-магазин/i));

    await waitFor(() => {
      const buttons = screen.getAllByText(/Добавить в корзину/i);
      assert.isAbove(buttons.length, 0);
    });
  });
});
