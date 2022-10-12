import {NavigationContainer} from '@react-navigation/native';
import type {PreloadedState} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react-native';
import React, {PropsWithChildren} from 'react';
import {Provider} from 'react-redux';

import {allReducers, RootState} from '../../redux_toolkit/stores/store';

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: allReducers,
    preloadedState,
  });
};

export function renderWithProvidersAndNavigation(
  ui: React.ReactElement,
  {preloadedState = {}, store = setupStore(preloadedState), ...renderOptions}: any = {},
) {
  function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <NavigationContainer>{children}</NavigationContainer>
      </Provider>
    );
  }
  return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
