import React from 'react';

import renderer from 'react-test-renderer';
import AgePicker from '../AgePicker';

test('renders correctly', () => {
  const tree = renderer.create(<AgePicker />).toJSON();
  expect(tree).toMatchSnapshot();
});
