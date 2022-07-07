/**
 * checkout(items, couponCode, paymentMode)
 * calculateTotal(items)
 * validateCouponCode(coupon)
 * fetchCouponAmount(coupon)
 * payment(amount, mode)
 * showNotification()
 * sendMail()
 */

async function checkout(items, paymentMode, couponCode) {
  if (!items || items.length <= 0) {
    throw Error('Cart must have at least 1 item');
  }
  let total = ecomm.calcTotal(items);
  let discount = 0;
  let successMessage;
  if (couponCode) {
    try {
      ecomm.validateCoupon(couponCode);
      discount = await ecomm.fetchCouponAmount(couponCode);
    } catch (error) {
      throw Error(`Unable to proceed: ${error.message}`);
    }
  }
  try {
    total = total - discount;
    successMessage = ecomm.payment(total, paymentMode);
  } catch (error) {
    throw Error(`Unable to proceed: ${error.message}`);
  }
  ecomm.showNotification(successMessage);
  ecomm.sendEmail(successMessage);
}

function calcTotal(items) {
  if (!items) throw Error('Items cannot be undefined');
  return items.reduce((acc, curr) => acc + curr.price, 0);
}

function validateCoupon(code) {
  if (typeof code === 'string' && code.length === 5) {
    return true;
  }
  throw Error('Invalid coupon code');
}

function fetchCouponAmount(code) {
  return new Promise((resolve, reject) => {
    let dice = Math.random() * 10;
    if (dice <= 50) {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 10 + 1));
      }, 1000);
    } else {
      throw Error('Error while fetching coupon amount');
    }
  });
}

function payment(total, paymentMode) {
  if (!paymentMode) {
    throw Error('Must specify payment mode');
  }
  switch (paymentMode) {
    case 'creditcard':
      return `Payment for Rs.${total} done via credit card`;
    case 'debitcard':
      return `Payment for Rs.${total} done via debit card`;
    default:
      throw Error(`Invalid payment mode ${paymentMode}`);
  }
}

function showNotification(message = '') {
  return `Notification: ${message}`;
}

function sendEmail(message = '') {
  return `Email: ${message}`;
}

const ecomm = {
  checkout,
  calcTotal,
  validateCoupon,
  fetchCouponAmount,
  payment,
  showNotification,
  sendEmail,
};

export default ecomm;
