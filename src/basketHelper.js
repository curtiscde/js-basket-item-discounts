export default (items, basketItems) => {
  let price = 0;
  basketItems.forEach((basketItemCode) => {
    price += items.find((item) => item.code === basketItemCode).price;
  });
  return price;
};
