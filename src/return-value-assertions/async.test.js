/**
 * promise
 *  - .then()
 *  - .resolves()
 *  - .rejects()
 * async await
 */

import { isEven } from './async';

describe('Async assertions', () => {
  describe('Promise with .then()', () => {
    it('resolves to true if the input is an even number', () => {
      //we must return the promise
      return isEven(2).then((data) => expect(data).toBeTruthy());
    });
    it('resolves to false if the input is an odd number', () => {
      //we must return the promise
      return isEven(3).then((data) => expect(data).toBeFalsy());
    });
    it('rejects with an error if input is not of type number', () => {
      //we must return the promise
      return isEven('hi').then(null, (reject) =>
        expect(reject).toBe('invalid type')
      );
    });
  });
  describe('Promise with .resolves()/.rejects()', () => {
    it('resolves to true if the input is an even number', () => {
      //we must return the promise
      return expect(isEven(2)).resolves.toBeTruthy();
    });
    it('resolves to false if the input is an odd number', () => {
      //we must return the promise
      return expect(isEven(3)).resolves.toBeFalsy();
    });
    it('rejects with an error if input is not of type number', () => {
      //we must return the promise
      return expect(isEven('hi')).rejects.toMatch(/invalid type/gi);
    });
  });

  describe('Async/Await', () => {
    it('returns true if the input is an even number', async () => {
      const result = await isEven(2);
      expect(result).toBeTruthy();
    });
    it('returns false if the input is an odd number', async () => {
      const result = await isEven(3);
      expect(result).toBeFalsy();
    });
    it('rejects with error message if the input is not of type number', async () => {
      try {
        const result = await isEven('hi');
      } catch (error) {
        expect(error).toMatch(/invalid type/gi);
      }
    });
  });
});
