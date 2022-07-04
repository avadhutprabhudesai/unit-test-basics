export const add = (x, y) => {
  if (!x || !y) throw new Error('Inputs cannot be empty');
  return +x + +y;
};
