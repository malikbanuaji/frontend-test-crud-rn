import React from 'react';
import renderer from 'react-test-renderer';
import FullName from '../FullName';

test('renders correctly ', () => {
  const tree = renderer
    .create(<FullName firstName={'Doe'} lastName={'Doe'} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without firstName', () => {
  const tree = renderer.create(<FullName lastName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly without lastName', () => {
  const tree = renderer.create(<FullName firstName={'Doe'} />).toJSON();
  expect(tree).toMatchSnapshot();
});
