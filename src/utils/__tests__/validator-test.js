const {
  ageValidator,
  firstNameValidator,
  lastNameValidator,
} = require('../validator');

test('age <= 0 is false', () => {
  expect(ageValidator(-1)).toEqual(false);
});

test('age > 100 is false', () => {
  expect(ageValidator(101)).toEqual(false);
});

test('age > 0 and age <= 100  is true', () => {
  expect(ageValidator(99)).toEqual(true);
});

test('age `undefined` is false', () => {
  expect(ageValidator(undefined)).toEqual(false);
});

test('age `null` is false', () => {
  expect(ageValidator(null)).toEqual(false);
});

test('age contain letters should be false', () => {
  expect(ageValidator('e12')).toEqual(false);
});

test('age value is valid and typeof age is string but all is number should be true', () => {
  expect(ageValidator('12')).toEqual(true);
});

// =====================================
// FirstNameValidator Test
// =====================================

test('firstName contain non alpha-numeric should be false', () => {
  expect(firstNameValidator('ab!')).toEqual(false);
});

test('firstName less than 3 letters should be false', () => {
  expect(firstNameValidator('ab')).toEqual(false);
});

test('firstName has more than or equals 3 letters of alpha-numeric should be true', () => {
  expect(firstNameValidator('Test1')).toEqual(true);
});

test('firstName contain `space` should be false', () => {
  expect(firstNameValidator('Te st')).toEqual(false);
});

test('firstName has more than 30 letters should be false', () => {
  expect(
    firstNameValidator('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest'),
  ).toEqual(false);
});

test('firstName `undefined` should be false', () => {
  expect(firstNameValidator(undefined)).toEqual(false);
});

test('firstName `null` should be false', () => {
  expect(firstNameValidator(null)).toEqual(false);
});

test('firstName typeof is number more than 3 letters alpha-numeric should be true', () => {
  expect(firstNameValidator(123)).toEqual(true);
});

// =====================================
// LastNameValidator Test
// =====================================

test('lastName contain non alpha-numeric should be false', () => {
  expect(lastNameValidator('ab!')).toEqual(false);
});

test('lastName less than 3 letters should be false', () => {
  expect(lastNameValidator('ab')).toEqual(false);
});

test('lastName has more than or equals 3 letters of alpha-numeric should be true', () => {
  expect(lastNameValidator('Test1')).toEqual(true);
});

test('lastName contain `space` should be false', () => {
  expect(lastNameValidator('Te st')).toEqual(false);
});

test('lastName has more than 30 letters should be false', () => {
  expect(
    lastNameValidator('Teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeest'),
  ).toEqual(false);
});

test('lastName `undefined` should be false', () => {
  expect(lastNameValidator(undefined)).toEqual(false);
});

test('lastName `null` should be false', () => {
  expect(lastNameValidator(null)).toEqual(false);
});

test('lastName typeof is number more than 3 letters alpha-numeric should be true', () => {
  expect(lastNameValidator(123)).toEqual(true);
});
