import getBasketTotal from './basketHelper';

const items = [
  { code: 'FR1', price: 311 },
  { code: 'SR1', price: 500 },
  { code: 'CF1', price: 1123 },
];

test('getBasketTotal - returns 0 price when no items added', () => {
  const basketItems = [];
  expect(getBasketTotal(items, basketItems, [])).toBe(0);
});


test('getBasketTotal - returns price of multiple combined items', () => {
  const basketItems = ['FR1', 'SR1'];
  expect(getBasketTotal(items, basketItems, [])).toBe(811);
});
