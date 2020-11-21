export const calculateTotalOrder = (products) =>
  products.reduce(
    (accumulator, { price, quantity }) => accumulator + price * quantity,
    0
  );
