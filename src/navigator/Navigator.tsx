import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterPage from '../screens/register/RegisterPage';
import LoginPage from '../screens/login/LoginPage';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ListPatientPage from '../screens/patient/ListPatientPage';
import AddPatientPage from '../screens/patient/AddPatientPage';
import EditPatientPage from '../screens/patient/EditPatientPage';
import SplashScreen from '../screens/SplashScreen';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux_toolkit/stores/store';
import {checkToken} from '../redux_toolkit/slices/authSlice';
type RootStackParamList = {
  login: undefined;
  register: undefined;
  layout: undefined;
  list: undefined;
  add: undefined;
  edit: undefined;
};
export type typeOfUseNavigationHook = NativeStackScreenProps<RootStackParamList>;

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(checkToken());
  }, []);

  if (authInfo.isLoading == 'loading') {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!(authInfo.isLoading === 'fulfilled') ? (
          <>
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="list" component={ListPatientPage} />
            <Stack.Screen name="add" component={AddPatientPage} />
            <Stack.Screen name="edit" component={EditPatientPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
