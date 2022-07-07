import cases from 'jest-in-case';
import { add, delayedSquare } from '.';
import {
  toBeString,
  toStartWith,
  toEqualCaseInsensitive,
  toInclude,
  toBePositive,
  toBeInteger,
  toBeNaN,
  toBeArray,
  toBeArrayOfSize,
  toIncludeAllMembers,
  toSatisfyAll,
  toBeEmptyObject,
  toBeObject,
  toContainKey,
  toContainValue,
  toContainKeys,
  toContainValues,
} from 'jest-extended';
expect.extend({
  toBeString,
  toStartWith,
  toEqualCaseInsensitive,
  toInclude,
  toBePositive,
  toBeInteger,
  toBeNaN,
  toBeArray,
  toBeArrayOfSize,
  toIncludeAllMembers,
  toSatisfyAll,
  toBeEmptyObject,
  toBeObject,
  toContainKey,
  toContainValue,
  toContainKeys,
  toContainValues,
});
/**
 * String
 *  - toBeString
 *  - toStartWith
 *  - toEqualCaseInsensitive
 *  - toInclude
 * Number
 *  - toBeNumber
 *  - toBeFinite
 *  - toBePositive
 *  - toBeEven
 *  - toBeInteger
 *  - toBeWithin
 *  - toBeNaN
 * Array
 *  - toBeArray
 *  - toBeArrayOfSize
 *  - toIncludeAllMembers
 *  - toSatisfyAll
 * Object
 *  - toBeObject()
 *  - toBeEmptyObject()
 */

describe('jest-extended', () => {
  describe('String', () => {
    it('extended matches for String', () => {
      const input = 'Jest is cool but it should support es module mocking asap';
      expect(input).toBeString();
      expect(input).toStartWith('Jest');
      expect('HI').toEqualCaseInsensitive('hi');
      expect(input).toInclude('es module');
    });
  });

  describe('Number', () => {
    it('extended matchers for Number', () => {
      expect(100).toBePositive();
      expect(100).toBeInteger();
      expect(3.142).not.toBeInteger();
      expect(Number('hi')).toBeNaN();
    });
  });

  describe('Array', () => {
    it('extended matchers for Array', () => {
      const input = [1, 2, 3, 4];
      expect(input).toBeArray();
      expect(input).toBeArrayOfSize(4);
      expect(input).toIncludeAllMembers([4, 3, 2, 1]);
      expect(input).toSatisfyAll((x) => x < 10);
    });
  });

  describe('Object', () => {
    it('extended matchers for Object', () => {
      const input = {
        id: 1,
        name: 'John Doe',
        address: {
          city: 'Pune',
          state: 'Maharashtra',
          country: 'India',
        },
        skills: ['React', 'Node', 'GraphQL'],
      };
      expect(input).toBeObject();
      expect(input).toContainKey('skills');
      expect(input).toContainKeys(['skills', 'address']);
      expect(input).toContainValue('John Doe');
    });
  });
});

describe('jest-in-case', () => {
  cases(
    'add(x,y)',
    (options) => {
      expect(add(options.x, options.y)).toBe(options.total);
    },
    [
      { name: '0+0 = 0', x: undefined, y: undefined, total: 0 },
      { name: '1+1 = 2', x: 1, y: 1, total: 2 },
      { name: '2+2 = 4', x: 2, y: 2, total: 4 },
      {
        name: '"hello" + "world"',
        x: 'hello',
        y: 'world',
        total: 'helloworld',
      },
    ]
  );

  cases(
    'delayedSquare(num)',
    async (o) => {
      const result = await delayedSquare(o.num);
      expect(result).toBe(o.result);
    },
    [
      { name: '2', num: 2, result: 4 },
      { name: '3', num: 3, result: 9 },
      { name: '4', num: 4, result: 16 },
    ]
  );
});
