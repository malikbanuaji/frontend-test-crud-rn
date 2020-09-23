import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import HeaderBarButton from '../HeaderBarButton';

test('renders correctly', () => {
  const tree = render(<HeaderBarButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByTestId, getByText} = render(
    <HeaderBarButton onPress={mockOnPress} text={'HeaderBarButton'} />,
  );
  const headerBarButton = getByTestId('header-bar-button');
  getByText('HeaderBarButton');
  fireEvent.press(headerBarButton);
  expect(mockOnPress).toBeCalled();
});
