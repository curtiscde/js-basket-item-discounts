import getBasketDiscounts from './discountHelper';

const collateBasketItems = (items, basketItems) => {
  const collatedItems = [];
  basketItems.forEach((basketItemCode) => {
    const existingItem = collatedItems.find((collatedItem) => collatedItem.code === basketItemCode);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      collatedItems.push({
        code: basketItemCode,
        price: items.find((item) => item.code === basketItemCode).price,
        quantity: 1,
      });
    }
  });
  return collatedItems;
};

const totalBasketItemPrice = (collatedBasketItems) => (
  collatedBasketItems.reduce((acc, collatedItem) => (
    acc + collatedItem.price * collatedItem.quantity
  ), 0)
);

const totalBasketDiscountAmount = (collatedBasketItems, discountRules) => {
  const discounts = getBasketDiscounts(collatedBasketItems, discountRules);
  return discounts.reduce((acc, discount) => (
    acc + discount.discountAmount
  ), 0);
};

export default (items, basketItems, discountRules) => {
  const collatedBasketItems = collateBasketItems(items, basketItems);
  return totalBasketItemPrice(collatedBasketItems)
    - totalBasketDiscountAmount(collatedBasketItems, discountRules);
};
