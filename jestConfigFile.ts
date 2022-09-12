import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage',()=> mockAsyncStorage);
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
jest.mock('react-native-snackbar', () => {});

// jest.mock('@react-navigation/native', () => {
//   const originalModule = jest.requireActual('@react-navigation/native');
//   return {...originalModule, useNavigation: jest.fn(() => {})};
// });

// jest.mock('react-redux', () => {
//   const originalModule = jest.requireActual('react-redux');
//   return {
//     ...originalModule,
//     useSelector: jest.fn(() => {}),
//     useDispatch: jest.fn(() => {}),
//   };
// });
