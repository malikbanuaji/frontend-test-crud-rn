import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBarButton from '../HeaderBarButton';

test('renders correctly', () => {
  const tree = renderer.create(<HeaderBarButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
