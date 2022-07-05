/**
 * Equality
 *  - property match
 *      toHaveProperty(propName)
 *  - property match with value
 *      toHaveProperty(propName, propVal)
 *  - nested primitives
 *      toHaveProperty('a')
 *      toHaveProperty(['a', 'b'])
 *  - nested objects
 *  - partial match
 *  - exact match
 */

describe('Objects', () => {
  describe('Equality', () => {
    let houseForSale;
    beforeEach(() => {
      houseForSale = {
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white',
          'nice.oven': true,
        },
        livingroom: {
          amenities: [
            {
              couch: [
                ['large', { dimensions: [20, 20] }],
                ['small', { dimensions: [10, 10] }],
              ],
            },
          ],
        },
        'ceiling.height': 2,
      };
    });
    it('checks if the received object has a property', () => {
      expect(houseForSale).toHaveProperty('bath');
    });
    it('checks if the received object has a nested property', () => {
      expect(houseForSale).toHaveProperty('kitchen.area');
    });
    it('checks if the received object has a property with specific value', () => {
      expect(houseForSale).toHaveProperty('bath', true);
      expect(houseForSale).toHaveProperty('bedrooms', 4);
    });
    it('checks if the received object has a specific value at nested path', () => {
      expect(houseForSale).toHaveProperty('kitchen.area', 20);
    });
    it('checks if the received object has a specific array at nested path', () => {
      expect(houseForSale).toHaveProperty('kitchen.amenities', [
        'oven',
        'stove',
        'washer',
      ]);
    });
    it('checks if the received object has expected partial object', () => {
      expect(houseForSale).toMatchObject({
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove', 'washer'],
          area: 20,
          wallColor: 'white',
          'nice.oven': true,
        },
      });
      expect(houseForSale).toEqual(
        expect.objectContaining({
          bath: expect.any(Boolean),
          bedrooms: expect.any(Number),
        })
      );
      expect(houseForSale).toEqual(
        expect.objectContaining({
          bath: true,
          bedrooms: 4,
        })
      );
    });
    it('checks if the received object matches exactly with the expected object', () => {
      expect({ id: 1, name: 'John Doe' }).toEqual({ id: 1, name: 'John Doe' });
    });
  });
});
