export function add(x = 0, y = 0) {
  return x + y;
}

export function delayedSquare(num) {
  return Promise.resolve(num * num);
}
