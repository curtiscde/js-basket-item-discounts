import getBasketTotal from './basketHelper';

class Basket {
  constructor(pricingRules) {
    this.basketItems = [];
    this.items = pricingRules.items;
  }

  add(itemCode) {
    this.basketItems.push(itemCode);
  }

  total() {
    const price = getBasketTotal(this.items, this.basketItems);
    const pricePounds = (price / 100).toFixed(2);
    return `£${pricePounds}`;
  }
}

export default Basket;
