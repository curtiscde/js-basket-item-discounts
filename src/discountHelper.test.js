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

test('getBasketDiscounts - does not return MULTIBUY discount', () => {
  const collatedBasketItems = [
    { code: 'FR1', price: 100, quantity: 1 },
    { code: 'SR1', price: 250, quantity: 1 },
    { code: 'CF1', price: 600, quantity: 2 },
  ];
  const discountRules = [{
    discountCode: 'MULTIBUY',
    itemCode: 'CF1',
    minimumItems: 3,
    discountAmount: 50,
  }];
  const basketDiscounts = getBasketDiscounts(collatedBasketItems, discountRules);
  expect(basketDiscounts).toEqual([]);
});


test('getBasketDiscounts - return MULTIBUY discount', () => {
  const collatedBasketItems = [
    { code: 'FR1', price: 100, quantity: 1 },
    { code: 'SR1', price: 250, quantity: 1 },
    { code: 'CF1', price: 600, quantity: 5 },
  ];
  const discountRules = [{
    discountCode: 'MULTIBUY',
    itemCode: 'CF1',
    minimumItems: 3,
    discountAmount: 50,
  }];
  const basketDiscounts = getBasketDiscounts(collatedBasketItems, discountRules);
  expect(basketDiscounts).toEqual([{
    itemCode: 'CF1',
    discountAmount: 250,
  }]);
});

test('getBasketDiscounts - return BOGOF and MULTIBUY discount', () => {
  const collatedBasketItems = [
    { code: 'FR1', price: 100, quantity: 3 },
    { code: 'SR1', price: 250, quantity: 1 },
    { code: 'CF1', price: 600, quantity: 5 },
  ];
  const discountRules = [
    {
      discountCode: 'BOGOF',
      itemCode: 'FR1',
    },
    {
      discountCode: 'MULTIBUY',
      itemCode: 'CF1',
      minimumItems: 3,
      discountAmount: 50,
    },
  ];
  const basketDiscounts = getBasketDiscounts(collatedBasketItems, discountRules);
  expect(basketDiscounts).toEqual([
    {
      itemCode: 'FR1',
      discountAmount: 100,
    },
    {
      itemCode: 'CF1',
      discountAmount: 250,
    },
  ]);
});
