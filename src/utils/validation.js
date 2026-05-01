export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPostalCode(postalCode) {
  const postalRegex = /^[A-Za-z0-9\s-]{4,10}$/;
  return postalRegex.test(postalCode.trim());
}

export function isEmpty(value) {
  return value.trim() === "" || value === null;
}
