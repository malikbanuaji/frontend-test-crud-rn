import * as Colors from './colors';

export const baseFontSize = 16;
export const smallFontSize = 14;
export const smallestFontSize = 10;
export const buttonFontSize = 16;
export const largeFontSize = 24;

export const baseText = {
  fontSize: baseFontSize,
  fontFamily: 'Rubik-Regular',
};

export const cardTitle = {
  fontSize: baseFontSize,
  fontFamily: 'Rubik-Medium',
};

export const cardSubtitle = {
  fontSize: smallFontSize,
  fontFamily: 'Rubik-Light',
};

export const actionButtonText = {
  fontFamily: 'Rubik-Medium',
  fontSize: smallFontSize,
};

export const contactTitle = {
  fontSize: largeFontSize + 4,
  fontFamily: 'Rubik-Medium',
};

export const contactSubtitle = {
  fontSize: baseFontSize + 4,
  fontFamily: 'Rubik-Regular',
};

export const buttonText = {
  fontSize: buttonFontSize,
  fontFamily: 'Rubik-Medium',
  textAlign: 'center',
};

export const headerButtonText = {
  fontSize: smallFontSize,
  fontFamily: 'Rubik-Medium',
  textAlign: 'center',
};

export const buttonDangerText = {
  fontSize: baseFontSize,
  fontFamily: 'Rubik-Medium',
  textAlign: 'center',
  color: Colors.white,
};

export const headerBarTitle = {
  fontSize: largeFontSize,
  fontFamily: 'Rubik-Light',
};
export const modalButtonItemText = {
  fontFamily: 'Rubik-Regular',
  fontSize: smallFontSize,
};

export const modalButtonActionText = {
  fontFamily: 'Rubik-Medium',
  fontSize: smallFontSize,
};

export const modalTitle = {
  fontFamily: 'Rubik-Light',
  fontSize: largeFontSize - 4,
};

const emptyPhotoText = {
  fontFamily: 'Rubik-Medium',
};

export const photoSmallEmptyText = {
  ...emptyPhotoText,
  fontSize: smallFontSize,
};

export const photoBigEmptyText = {
  ...emptyPhotoText,
  fontSize: largeFontSize * 2,
};

export const headerLoadingText = {
  fontFamily: 'Rubik-Medium',
  fontSize: smallFontSize,
};
