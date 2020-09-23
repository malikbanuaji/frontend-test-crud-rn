export const MIN_AGE = 1;
export const MAX_AGE = 100;

const MIN_FIRST_NAME_LENGTH = 3;
const MAX_FIRST_NAME_LENGTH = 30;

const MIN_LAST_NAME_LENGTH = 3;
const MAX_LAST_NAME_LENGTH = 30;

export function firstNameValidator(text) {
  if (typeof text === 'undefined' || text === null) {
    return false;
  }
  const nameRegex = new RegExp(
    `^[A-Za-z0-9]{${MIN_FIRST_NAME_LENGTH},${MAX_FIRST_NAME_LENGTH}}$`,
    'g',
  );
  return nameRegex.test(text);
}
export function lastNameValidator(text) {
  if (typeof text === 'undefined' || text === null) {
    return false;
  }
  const nameRegex = new RegExp(
    `^[A-Za-z0-9]{${MIN_LAST_NAME_LENGTH},${MAX_LAST_NAME_LENGTH}}$`,
    'g',
  );
  return nameRegex.test(text);
}
export function ageValidator(text) {
  const ageRegex = /^[0-9]*$/gm;
  const status = ageRegex.test(text);

  const age = Number(text);
  if (status === true) {
    return age >= MIN_AGE && age <= MAX_AGE;
  }

  return status;
}
