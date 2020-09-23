import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import PhotoBig from '../PhotoBig';

test('renders correctly with image', () => {
  const tree = render(
    <PhotoBig
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without image', () => {
  const tree = render(<PhotoBig photo={'N/A'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without firstName', () => {
  const tree = render(<PhotoBig lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without lastName', () => {
  const tree = render(<PhotoBig firstName={'John'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with full props', () => {
  const tree = render(
    <PhotoBig
      firstName={'Doe'}
      lastName={'Doe'}
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('handle press correctly', () => {
  const mockOnPress = jest.fn();
  const {getByTestId} = render(
    <PhotoBig
      onPress={mockOnPress}
      firstName={'John'}
      lastName={'Doe'}
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
    />,
  );
  const button = getByTestId('photo-big-button');
  fireEvent.press(button);
  expect(mockOnPress).toBeCalled();
});
