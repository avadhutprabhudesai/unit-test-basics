export function isEven(val) {
  return new Promise((resolve, reject) => {
    if (typeof val !== 'number') {
      reject('invalid type');
    }
    let condition = val % 2 === 0;
    if (condition) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
