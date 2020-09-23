import React from 'react';

import {fireEvent, render} from '@testing-library/react-native';
import BaseButton from '../BaseButton';

test('renders correctly', () => {
  const tree = render(<BaseButton text={'MockedText'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly when disabled', () => {
  const tree = render(
    <BaseButton disabled={true} text={'MockedText'} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn((x) => 42 + x);
  const {getByText} = render(
    <BaseButton onPress={mockOnPress} text={'MockedText'} disabled={false} />,
  );
  fireEvent.press(getByText('MockedText'));
  expect(mockOnPress).toBeCalled();
});

test('handle press correctly when disabled', () => {
  const mockOnPress = jest.fn();
  const {getByText} = render(
    <BaseButton onPress={mockOnPress} text={'MockedText'} disabled={true} />,
  );
  fireEvent.press(getByText('MockedText').parent.parent);
  expect(mockOnPress).not.toBeCalled();
});
