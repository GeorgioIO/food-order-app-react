export function calculateCartTotal(items) {
  return items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );
}
