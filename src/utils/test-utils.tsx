import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../redux_toolkit/stores/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistedStore} from '../redux_toolkit/stores/store';
import {NavigationContainer} from '@react-navigation/native';
const AllTheProviders = ({children}: any) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        /<NavigationContainer>{children}</NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const customRender = (ui?: any, options?: any) =>
  render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
