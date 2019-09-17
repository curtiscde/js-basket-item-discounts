class Basket {
  constructor(pricingRules) {
    this.basketItems = [];
    this.items = pricingRules.items;
  }

  add(itemCode) {
    this.basketItems.push(itemCode);
  }

  total() {
    let price = 0;
    this.basketItems.forEach((basketItemCode) => {
      price += this.items.find((item) => item.code === basketItemCode).price;
    });
    const pricePounds = (price / 100).toFixed(2);
    return `£${pricePounds}`;
  }
}

export default Basket;
