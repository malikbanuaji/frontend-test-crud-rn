import * as Colors from './colors';

export const borderRadius = 8;

export const contactListItem = {
  borderRadius: borderRadius,
  overflow: 'hidden',
};

export const contactListItemPhoto = {
  borderRadius: borderRadius,
  backgroundColor: Colors.primary,
};

export const actionAddContact = {
  borderRadius: borderRadius,
  overflow: 'hidden',
};

export const button = {
  borderRadius: borderRadius - 4,
  overflow: 'hidden',
};

export const buttonBorder = {
  borderWidth: 1,
  borderColor: Colors.darkGray,
};

export const buttonBorderDanger = {
  borderWidth: 1,
  borderColor: Colors.danger,
};

export const buttonDanger = {
  ...button,
  backgroundColor: Colors.danger,
};
