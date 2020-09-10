export function firstNameValidator(text) {
  const nameRegex = /^[A-Za-z0-9]{3,30}$/g;
  return nameRegex.test(text);
}
export function lastNameValidator(text) {
  const nameRegex = /^[A-Za-z0-9]{3,30}$/g;
  return nameRegex.test(text);
}
export function ageValidator(text) {
  const ageRegex = /^[0-9]*$/gm;
  return ageRegex.test(text);
}
