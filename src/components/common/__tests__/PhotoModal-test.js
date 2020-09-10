import React from 'react';
import renderer from 'react-test-renderer';
import PhotoModal from '../PhotoModal';

test('renders correctly without photo', () => {
  const tree = renderer.create(<PhotoModal hasPhoto={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly with photo', () => {
  const tree = renderer.create(<PhotoModal hasPhoto={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
