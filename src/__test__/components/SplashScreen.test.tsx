import React from 'react';
import {render} from '@testing-library/react-native';
import SplashScreen from '../../screens/SplashScreen';

it('should render splash screen properly', () => {
  const page = render(<SplashScreen />);
  expect(page).toMatchSnapshot();
});
