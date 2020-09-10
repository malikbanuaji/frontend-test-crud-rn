import React from 'react';

import renderer from 'react-test-renderer';
import BackButton from '../BackButton';

test('renders correctly', () => {
  const tree = renderer.create(<BackButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
