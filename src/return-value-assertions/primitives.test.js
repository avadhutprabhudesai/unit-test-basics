import { add } from './primitives';

/**
 * Primitives
 *  - number
 *      - int
 *      - float
 *      - NaN
 *      - any number literal or Number object
 *  - string
 *      - substring
 *      - regex
 *      - any string literal or String object
 *  - boolean
 *      - truthy
 *      - falsy
 *  - undefined
 *  - null
 */

describe('Primitives', () => {
  describe('number', () => {
    it('asserts int value', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(1, 2)).toEqual(3);
      expect(add(1, 2)).toBeGreaterThan(2);
      expect(add(1, 2)).toBeGreaterThanOrEqual(3);
      expect(add(1, 2)).toBeLessThan(4);
      expect(add(1, 2)).toBeLessThanOrEqual(3);
    });
    it('asserts float value', () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    });
    it('asserts NaN value', () => {
      expect(add(1, 'invalid')).toBeNaN();
    });
    it('asserts any number value', () => {
      expect(add(1, Math.random() * 10)).toEqual(expect.any(Number));
      expect(new Number(10)).toEqual(expect.any(Number));
    });
  });

  describe('strings', () => {
    const str = 'vitest is so much cooler than jest';
    it('asserts substring', () => {
      expect('lorem ipsum').toMatch('sum');
    });
    it('asserts regex', () => {
      expect(str).toMatch(/cooler/);
      expect(str).toMatch(/vitest/);
      expect(str).toMatch(/JEST/gi);
    });
    it('asserts any string value', () => {
      expect(str).toEqual(expect.any(String));
      expect(new String('Awesome')).toEqual(expect.any(String));
    });
  });

  describe('booleans', () => {
    it('asserts true', () => {
      expect('lorem ipsum').toBeTruthy();
      expect([]).toBeTruthy();
      expect({}).toBeTruthy();
      expect(1).toBeTruthy();
      expect(true).toBeTruthy();
    });
    it('asserts false', () => {
      expect('').toBeFalsy();
      expect(false).toBeFalsy();
      expect(null).toBeFalsy();
      expect(NaN).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect(+0).toBeFalsy();
      expect(-0).toBeFalsy();
      expect(0).toBeFalsy();
    });
  });

  describe('undefined', () => {
    it('asserts undefined', () => {
      let noop = () => {},
        empty;
      expect(noop()).toBeUndefined();
      expect(empty).toBeUndefined();
    });
  });

  describe('null', () => {
    it('asserts null', () => {
      let noop = () => null,
        empty = null;
      expect(noop()).toBeNull();
      expect(empty).toBeNull();
    });
  });
});
