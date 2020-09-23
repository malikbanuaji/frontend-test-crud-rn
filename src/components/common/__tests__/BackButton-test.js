import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import BackButton from '../BackButton';

test('renders correctly', () => {
  const tree = render(<BackButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByTestId} = render(<BackButton onPress={mockOnPress} />);
  fireEvent.press(getByTestId('back-button'));
  expect(mockOnPress).toBeCalled();
});
