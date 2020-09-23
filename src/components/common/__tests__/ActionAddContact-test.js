import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import ActionAddContact from '../ActionAddContact';

test('renders correctly', () => {
  const {toJSON} = render(<ActionAddContact />);
  expect(toJSON()).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByTestId} = render(<ActionAddContact onPress={mockOnPress} />);
  fireEvent.press(getByTestId('action-add-contact-button'));
  expect(mockOnPress).toBeCalled();
});
