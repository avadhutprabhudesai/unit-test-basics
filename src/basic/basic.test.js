import { add } from './basic';

/**
 * - AAA
 * - Testing various scenarios
 * - Testing for errors
 */

it('should return a sum of 2 numbers', () => {
  // Arrange
  const inputs = [1, 2];

  // Act
  const result = add(...inputs);

  // Assert
  const expected = inputs.reduce((acc, curr) => acc + curr, 0);
  expect(result).toBe(expected);
});

it('should return NaN if any of the arguments is not convertible to number', () => {
  const inputs = ['hi', 2];

  const result = add(...inputs);

  const expected = NaN;
  expect(result).toBeNaN();
});

it('should return a numeric sum for valid numeric strings as inputs', () => {
  const inputs = ['1', '2'];

  const result = add(...inputs);

  const expected = inputs.reduce((acc, curr) => +acc + +curr, 0);
  expect(result).toBe(expected);
});

it('should throw an error if input is empty', () => {
  const resultFn = () => add();

  expect(resultFn).toThrowError(/^Inputs cannot be empty$/);
});
