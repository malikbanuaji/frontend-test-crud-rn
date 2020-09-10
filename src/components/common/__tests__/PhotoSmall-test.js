import React from 'react';
import renderer from 'react-test-renderer';
import PhotoSmall from '../PhotoSmall';

test('renders correctly with image', () => {
  const tree = renderer
    .create(
      <PhotoSmall
        photo={
          'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
        }
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without image', () => {
  const tree = renderer.create(<PhotoSmall photo={'N/A'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without firstName', () => {
  const tree = renderer.create(<PhotoSmall lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without lastName', () => {
  const tree = renderer.create(<PhotoSmall firstName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with full props', () => {
  const tree = renderer
    .create(
      <PhotoSmall
        firstName={'Doe'}
        lastName={'Doe'}
        photo={
          'https://mattermost.com/wp-content/uploads/2018/10/React_Native_Logo.png'
        }
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
