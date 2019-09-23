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
  {
    discountCode: 'MULTIBUY',
    itemCode: 'SR1',
    minimumItems: 3,
    discountAmount: 50,
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

test('Basket total - returns combined discounted price - Test Data #1', () => {
  const basket = new Basket({
    items,
    discountRules,
  });
  basket.add('FR1');
  basket.add('SR1');
  basket.add('FR1');
  basket.add('CF1');
  const price = basket.total();
  expect(price).toEqual('£19.34');
});

test('Basket total - returns combined discounted price - Test Data #2', () => {
  const basket = new Basket({
    items,
    discountRules,
  });
  basket.add('FR1');
  basket.add('FR1');
  const price = basket.total();
  expect(price).toEqual('£3.11');
});

test('Basket total - returns combined discounted price - Test Data #3', () => {
  const basket = new Basket({
    items,
    discountRules,
  });
  basket.add('SR1');
  basket.add('SR1');
  basket.add('FR1');
  basket.add('SR1');
  const price = basket.total();
  expect(price).toEqual('£16.61');
});
