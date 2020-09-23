import React from 'react';

import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AgePicker from '../AgePicker';

test('renders correctly', () => {
  const {toJSON} = render(<AgePicker />);
  expect(toJSON()).toMatchSnapshot();
});

test('handle onValueChange', async () => {
  const mockOnValueChange = jest.fn();
  const selectedValue = '1';
  const {getByTestId} = render(
    <AgePicker
      selectedValue={selectedValue}
      onValueChange={mockOnValueChange}
    />,
  );
  const agePicker = getByTestId('age-picker');
  fireEvent(agePicker, 'onValueChange', {value: '26'});
  expect(mockOnValueChange).toBeCalled();
});
