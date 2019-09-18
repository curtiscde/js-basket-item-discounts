const bogofDiscount = (collatedBasketItem) => {
  const applicableBogofItems = Math.floor(collatedBasketItem.quantity / 2);
  return applicableBogofItems ? {
    itemCode: collatedBasketItem.code,
    discountAmount: (collatedBasketItem.price * applicableBogofItems),
  } : null;
};

const getItemDiscount = (collatedBasketItem, discountRule) => {
  let discount;
  if (discountRule) {
    switch (discountRule.discountCode) {
      case 'BOGOF':
        discount = bogofDiscount(collatedBasketItem);
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
