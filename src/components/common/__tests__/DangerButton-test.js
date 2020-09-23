import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import DangerButton from '../DangerButton';

test('renders correctly', () => {
  const tree = render(<DangerButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders correctly when disabled', () => {
  const tree = render(<DangerButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByText} = render(
    <DangerButton onPress={mockOnPress} text={'MockedDangerText'} />,
  );
  fireEvent.press(getByText('MockedDangerText'));
  expect(mockOnPress).toBeCalled();
});

test('handle press correctly when disabled', () => {
  const mockOnPress = jest.fn();
  const {getByText} = render(
    <DangerButton
      onPress={mockOnPress}
      text={'MockedDangerText'}
      disabled={true}
    />,
  );
  fireEvent.press(getByText('MockedDangerText'));
  expect(mockOnPress).not.toBeCalled();
});
