import Basket from './index';

const items = [
  { code: 'FR1', price: 311 },
  { code: 'SR1', price: 500 },
  { code: 'CF1', price: 1123 },
];

test('Basket total - returns 0 price when no items added', () => {
  const basket = new Basket({
    items,
  });
  const price = basket.total();
  expect(price).toEqual('£0.00');
});
