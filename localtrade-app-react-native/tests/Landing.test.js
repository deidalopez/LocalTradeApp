import React from 'react'; 
import renderer from 'react-test-renderer'; 
import Landing from '../components/Landing/Landing.js';
// const Landing = require('../components/Landing/Landing')

test('renders correctly', () => {
  const tree = renderer.create(<Landing/>).toJSON();
  expect(tree).toMatchSnapshot();
})