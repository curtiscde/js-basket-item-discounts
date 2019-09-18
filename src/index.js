import getBasketTotal from './basketHelper';

class Basket {
  constructor(pricingRules) {
    this.basketItems = [];
    this.items = pricingRules.items;
    this.discountRules = pricingRules.discountRules;
  }

  add(itemCode) {
    this.basketItems.push(itemCode);
  }

  total() {
    const price = getBasketTotal(this.items, this.basketItems, this.discountRules);
    const pricePounds = (price / 100).toFixed(2);
    return `£${pricePounds}`;
  }
}

export default Basket;
