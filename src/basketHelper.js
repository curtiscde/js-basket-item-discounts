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

export default (items, basketItems) => {
  const collatedItems = collateBasketItems(items, basketItems);
  return collatedItems.reduce((acc, collatedItem) => (
    acc + collatedItem.price
  ), 0);
};
