/**
 * Checks if the given email address is valid according to a regular expression pattern.
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} Returns `true` if the email address is valid, `false` otherwise.
 *
 * @example
 * // returns true
 * isValidEmail('john.doe@example.com');
 *
 * @example
 * // returns false
 * isValidEmail('john.doe@invalid');
 */
export function isEmailValid(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}
