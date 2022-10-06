import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import {type PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {store} from '../redux_toolkit/stores/store';
import React from 'react';

const AllTheProviders = ({children}: PropsWithChildren) => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistedStore}> */}
      <NavigationContainer>{children}</NavigationContainer>
      {/* </PersistGate> */}
    </Provider>
  );
};

const customRender = (ui: any, options?: any) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {customRender as render};
