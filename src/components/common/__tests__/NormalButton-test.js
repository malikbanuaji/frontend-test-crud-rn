import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import NormalButton from '../NormalButton';

test('renders correctly', () => {
  const tree = render(<NormalButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders correctly when disabled', () => {
  const tree = render(<NormalButton disabled />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByText} = render(
    <NormalButton onPress={mockOnPress} text={'MockedNormalButton'} />,
  );
  fireEvent.press(getByText('MockedNormalButton'));
  expect(mockOnPress).toBeCalled();
});

test('handle press correctly when disabled', async () => {
  const mockOnPress = jest.fn();
  const {getByText} = render(
    <NormalButton onPress={mockOnPress} text={'MockedNormalButton'} disabled />,
  );

  const button = await waitFor(() => getByText('MockedNormalButton'));
  fireEvent(button, 'onPress', null);
  expect(mockOnPress).not.toBeCalled();
});
