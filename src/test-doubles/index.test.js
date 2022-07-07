import { jest } from '@jest/globals';
import util from './utils';

import ecomm from './ecommerce';

/**
 * E commerce checkout transaction (items, couponcode, payment mode)
 * - calculate total amount for the items
 * - validate coupon code
 * - fetch coupon amount
 * - deduct coupon amount from total
 * - call payment function with total amount and payment mode
 * - on success, show success notification and send email
 */

let calcTotal = jest.spyOn(ecomm, 'calcTotal').mockImplementation(() => {});
let validateCoupon = jest
  .spyOn(ecomm, 'validateCoupon')
  .mockImplementation(() => true);
let fetchCouponAmount = jest
  .spyOn(ecomm, 'fetchCouponAmount')
  .mockImplementation(() => new Promise((res) => res(20)));
let payment = jest.spyOn(ecomm, 'payment').mockImplementation(() => {});
let showNotification = jest
  .spyOn(ecomm, 'showNotification')
  .mockImplementation(() => {});
let sendEmail = jest.spyOn(ecomm, 'sendEmail').mockImplementation(() => {});

const __setup = () => {
  calcTotal.mockReset();
  validateCoupon.mockReset();
  fetchCouponAmount.mockReset();
  payment.mockReset();
  showNotification.mockReset();
  sendEmail.mockReset();
};
const __tearDown = () => {
  calcTotal.mockRestore();
  validateCoupon.mockRestore();
  fetchCouponAmount.mockRestore();
  payment.mockRestore();
  showNotification.mockRestore();
  sendEmail.mockRestore();
};

let items = [{ price: 100 }],
  paymentMode = 'creditcard',
  couponCode = 'AUG20',
  successMessage = 'Payment of Rs.80 done via credit card';

describe('checkout()', () => {
  beforeEach(__setup);
  afterAll(__tearDown);

  it('throws error when cart is empty', async () => {
    try {
      await ecomm.checkout();
    } catch (error) {
      expect(error.message).toBe('Cart must have at least 1 item');
    }
    expect(calcTotal).toHaveBeenCalledTimes(0);
  });

  it('throws error when coupon code is invalid', async () => {
    // Arrange
    couponCode = 'invalid';
    validateCoupon.mockImplementation(() => {
      throw Error('Invalid coupon code');
    });

    // Act
    try {
      await ecomm.checkout(items, paymentMode, couponCode);
    } catch (error) {
      // Assert
      expect(error.message).toMatch(/invalid coupon code/gi);
    }

    // Assert
    expect(validateCoupon).toHaveBeenCalledTimes(1);
    expect(validateCoupon).toHaveBeenCalledWith(couponCode);
    expect(fetchCouponAmount).toHaveBeenCalledTimes(0);
  });

  it('propagates error occurred while fetching coupon amount', async () => {
    // Arrange
    // validateCoupon.mockImplementation(() => true);
    fetchCouponAmount.mockImplementation(() => {
      throw Error('Unable to fetch coupon amount');
    });

    // Act
    try {
      await ecomm.checkout(items, paymentMode, couponCode);
    } catch (error) {
      // Assert
      expect(error.message).toMatch(/unable to fetch coupon amount/gi);
    }

    // Assert
    expect(fetchCouponAmount).toHaveBeenCalledTimes(1);
    expect(fetchCouponAmount).toHaveBeenCalledWith(couponCode);
  });

  it('throws error for invalid payment mode', async () => {
    // Arrange
    // validateCoupon.mockImplementation(() => true);
    fetchCouponAmount.mockImplementation(() => {
      return 20;
    });
    payment.mockImplementation(() => {
      throw Error('Invalid payment mode');
    });

    // Act
    try {
      await ecomm.checkout(items, paymentMode, couponCode);
    } catch (error) {
      // Assert
      expect(error.message).toMatch(/invalid payment mode/gi);
    }

    // Assert
    expect(fetchCouponAmount).toHaveBeenCalledTimes(1);
    expect(fetchCouponAmount).toHaveBeenCalledWith(couponCode);
  });

  it('throws error if payment mode is not provided', async () => {
    // Arrange
    payment.mockImplementation(() => {
      throw Error('Must specify payment mode');
    });

    // Act
    try {
      await ecomm.checkout(items, paymentMode, couponCode);
    } catch (error) {
      // Assert
      expect(error.message).toMatch(/must specify payment mode/gi);
    }

    // Assert
    expect(fetchCouponAmount).toHaveBeenCalledTimes(1);
    expect(fetchCouponAmount).toHaveBeenCalledWith(couponCode);
  });
  it('calculates total', () => {
    ecomm.checkout(items, paymentMode, couponCode);
    expect(calcTotal).toHaveBeenCalledWith(items);
  });
  it('validates coupon when couponCode is passed in', () => {
    calcTotal.mockReturnValue(100);

    ecomm.checkout(items, paymentMode, couponCode);
    expect(validateCoupon).toHaveBeenCalledTimes(1);
    expect(validateCoupon).toHaveBeenCalledWith(couponCode);
  });

  it('fetches discount value when valid coupon is passed in', () => {
    ecomm.checkout(items, paymentMode, couponCode);
    expect(fetchCouponAmount).toHaveBeenCalledTimes(1);
    expect(fetchCouponAmount).toHaveBeenCalledWith(couponCode);
  });

  it('performs payment with given value and payment mode', async () => {
    calcTotal.mockReturnValue(100);
    fetchCouponAmount.mockResolvedValue(20);

    ecomm.checkout(items, paymentMode, couponCode);
    expect(fetchCouponAmount).toHaveBeenCalledTimes(1);
    await new Promise(process.nextTick);
    expect(payment).toHaveBeenCalledTimes(1);
    expect(payment).toHaveBeenCalledWith(80, paymentMode);
  });

  it('gives feedback after successful payment', async () => {
    calcTotal.mockReturnValueOnce(100);
    fetchCouponAmount.mockResolvedValueOnce(20);
    payment.mockReturnValueOnce(successMessage);

    ecomm.checkout(items, paymentMode, couponCode);

    await new Promise(process.nextTick);
    expect(showNotification).toHaveBeenCalledTimes(1);
    expect(showNotification).toHaveBeenCalledWith(successMessage);
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith(successMessage);
  });
});

describe('calcTotal()', () => {
  it('throws error if items are not passed ', () => {
    expect(() => ecomm.calcTotal()).toThrow(/items cannot be undefined/gi);
  });
  it('returns 0 if there are 0 items', () => {
    const input = [];
    const result = ecomm.calcTotal(input);

    expect(result).toBe(0);
  });

  it('calculates total amount for given items', () => {
    const input = [{ price: 100 }, { price: 200 }, { price: 300 }];

    const result = ecomm.calcTotal(input);

    expect(result).toBe(600);
  });
});

describe('validateCoupon()', () => {
  it('throws error if no coupon code is provided', () => {
    expect(() => ecomm.validateCoupon()).toThrow(/invalid coupon code/gi);
  });
  it('throws error if coupon code is not a string', () => {
    expect(() => ecomm.validateCoupon(123)).toThrow(/invalid coupon code/gi);
  });
  it('throws error if coupon code is not a string of proper length', () => {
    expect(() => ecomm.validateCoupon('AUG200')).toThrow(
      /invalid coupon code/gi
    );
  });
  it('returns tru if coupon code is in proper format', () => {
    expect(ecomm.validateCoupon('AUG20')).toBeTruthy();
  });
});

describe('fetchCouponAmount()', () => {
  const random = jest.spyOn(Math, 'random');
  afterAll(() => {
    random.mockRestore();
  });

  it('resolves with a discount value for a coupon code', async () => {
    random.mockReturnValue(4);

    const result = await ecomm.fetchCouponAmount('AUG20');

    await new Promise(process.nextTick);

    expect(result).toBe(41);
  });

  it('throws error', async () => {
    random.mockReturnValue(6);

    try {
      const result = await ecomm.fetchCouponAmount('code');
    } catch (error) {
      expect(error.message).toMatch(/error while fetching coupon amount/gi);
    }
  });
});

describe('payment()', () => {
  it('throws error if payment mode is not specified', async () => {
    expect(() => ecomm.payment(200)).toThrow(/must specify payment mode/gi);
  });
  it('throws error if invalid payment mode is specified', async () => {
    expect(() => ecomm.payment(200, 'cash')).toThrow(/invalid payment mode/gi);
  });
  it('returns proper success message if payment is successful', () => {
    expect(ecomm.payment(200, 'creditcard')).toBe(
      'Payment for Rs.200 done via credit card'
    );
    expect(ecomm.payment(300, 'debitcard')).toBe(
      'Payment for Rs.300 done via debit card'
    );
  });
});

describe('showNotification()', () => {
  it('shows notification to user', async () => {
    expect(ecomm.showNotification('Done')).toBe('Notification: Done');
  });
});

describe('sendEmail()', () => {
  it('sends email to user with given content', async () => {
    expect(ecomm.sendEmail('Payment Done')).toBe('Email: Payment Done');
  });
});
