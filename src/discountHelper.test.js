import getBasketDiscounts from './discountHelper';

test('getBasketDiscounts - does not return BOGOF discount', () => {
  const collatedBasketItems = [
    { code: 'FR1', price: 100, quantity: 1 },
    { code: 'SR1', price: 250, quantity: 1 },
    { code: 'CF1', price: 600, quantity: 1 },
  ];
  const discountRules = [{
    discountCode: 'BOGOF',
    itemCode: 'FR1',
  }];
  const basketDiscounts = getBasketDiscounts(collatedBasketItems, discountRules);
  expect(basketDiscounts).toEqual([]);
});


test('getBasketDiscounts - return BOGOF discount', () => {
  const collatedBasketItems = [
    { code: 'FR1', price: 100, quantity: 2 },
    { code: 'SR1', price: 250, quantity: 1 },
    { code: 'CF1', price: 600, quantity: 1 },
  ];
  const discountRules = [{
    discountCode: 'BOGOF',
    itemCode: 'FR1',
  }];
  const basketDiscounts = getBasketDiscounts(collatedBasketItems, discountRules);
  expect(basketDiscounts).toEqual([{
    itemCode: 'FR1',
    discountAmount: 100,
  }]);
});
