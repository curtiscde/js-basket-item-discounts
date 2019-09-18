import Basket from './index';

const items = [
  { code: 'FR1', price: 311 },
  { code: 'SR1', price: 500 },
  { code: 'CF1', price: 1123 },
];

const discountRules = [
  {
    discountCode: 'BOGOF',
    itemCode: 'FR1',
  },
];

test('Basket total - returns 0 price when no items added', () => {
  const basket = new Basket({
    items,
    discountRules,
  });
  const price = basket.total();
  expect(price).toEqual('£0.00');
});

test('Basket total - returns price when 1 item added', () => {
  const basket = new Basket({
    items,
    discountRules,
  });
  basket.add('FR1');
  const price = basket.total();
  expect(price).toEqual('£3.11');
});
