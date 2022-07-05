/**
 * Arrays
 *  - equality
 *    - exact
 *        toEqual()
 *    - shuffled
 *        toEqual(expect.arrayContaining())
 *    - includes primitive
 *        toContaining(item)
 *    - includes object
 *        toContainingEqual(item)
 *    - includes subarray
 *        toEqual(expect.arrayContaining())
 *  - any array
 */

describe('Arrays', () => {
  describe('Equality', () => {
    let numArr, strArr, objArr;

    beforeEach(() => {
      numArr = [1, 2, 3, 4];
      strArr = ['lime', 'apple', 'orange'];
      objArr = [
        {
          id: 1,
          name: 'John Doe',
        },
        {
          id: 2,
          name: 'Jane Doe',
        },
        {
          id: 3,
          name: 'Bob Smith',
        },
      ];
    });
    it('checks for exact equality of 2 arrays', () => {
      const expected = [1, 2, 3, 4];
      expect(numArr).toEqual(expected);
    });
    it('checks for shuffled equality of 2 arrays', () => {
      expect(numArr).toEqual(expect.arrayContaining([3, 4, 2, 1]));
      expect(numArr).toEqual(expect.arrayContaining([3, 1, 2, 4]));
    });
    it('checks if a primitive value exists in array', () => {
      expect(numArr).toContain(1);
      expect(strArr).toContain('apple');
      expect(strArr).toEqual(expect.arrayContaining(['apple']));
    });
    it('checks if an object value exists in array', () => {
      const expected = {
        id: 2,
        name: 'Jane Doe',
      };
      expect(objArr).toContainEqual(expected);
      expect(objArr).toEqual(
        expect.arrayContaining([{ id: 3, name: 'Bob Smith' }])
      );
    });
    it('checks if a subarray exists in array ', () => {
      expect(numArr).toEqual(expect.arrayContaining([3, 2, 1])); //order does not matter
      expect(strArr).toEqual(expect.arrayContaining(['apple', 'orange']));
    });
  });

  describe('Any array', () => {
    let numArr;
    beforeEach(() => {
      numArr = [1, 2, 3, 4];
    });
    it('checks if received value is an array', () => {
      expect(numArr).toEqual(expect.any(Array));
    });
  });

  describe('Length', () => {
    let numArr;
    beforeEach(() => {
      numArr = [1, 2, 3, 4];
    });
    it('checks if received array has expected length', () => {
      expect(numArr).toHaveLength(4);
    });
  });
});
