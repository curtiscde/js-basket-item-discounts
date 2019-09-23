const bogofDiscount = (collatedBasketItem) => {
  const applicableBogofItems = Math.floor(collatedBasketItem.quantity / 2);
  return applicableBogofItems ? {
    itemCode: collatedBasketItem.code,
    discountAmount: (collatedBasketItem.price * applicableBogofItems),
  } : null;
};

const multibuyDiscount = (collatedBasketItem, discountRule) => {
  const discountAmount = (collatedBasketItem.quantity >= discountRule.minimumItems)
    ? (discountRule.discountAmount * collatedBasketItem.quantity) : null;
  return discountAmount ? {
    itemCode: collatedBasketItem.code,
    discountAmount,
  } : null;
};

const getItemDiscount = (collatedBasketItem, discountRule) => {
  let discount;
  if (discountRule) {
    switch (discountRule.discountCode) {
      case 'BOGOF':
        discount = bogofDiscount(collatedBasketItem);
        break;
      case 'MULTIBUY':
        discount = multibuyDiscount(collatedBasketItem, discountRule);
        break;
      default:
        break;
    }
  }
  return (discount && discount.discountAmount) ? discount : null;
};

export default (collatedBasketItems, discountRules) => {
  const discounts = [];
  if (discountRules) {
    collatedBasketItems.forEach((collatedBasketItem) => {
      const discountRule = discountRules.find((rule) => rule.itemCode === collatedBasketItem.code);
      const itemDiscount = getItemDiscount(collatedBasketItem, discountRule);
      if (itemDiscount) discounts.push(itemDiscount);
    });
  }
  return discounts;
};
