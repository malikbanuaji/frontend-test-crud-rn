import {render} from '@testing-library/react-native';
import React from 'react';
import PhotoSmall from '../PhotoSmall';

test('renders correctly with image', () => {
  const tree = render(
    <PhotoSmall
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without image', () => {
  const tree = render(<PhotoSmall photo={'N/A'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without firstName', () => {
  const tree = render(<PhotoSmall lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without lastName', () => {
  const tree = render(<PhotoSmall firstName={'John'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with full props', () => {
  const tree = render(
    <PhotoSmall
      firstName={'John'}
      lastName={'Doe'}
      photo={
        'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
      }
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
