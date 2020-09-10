import React from 'react';

import renderer from 'react-test-renderer';
import ActionAddContact from '../ActionAddContact';

test('renders correctly', () => {
  const tree = renderer.create(<ActionAddContact />).toJSON();
  expect(tree).toMatchSnapshot();
});
