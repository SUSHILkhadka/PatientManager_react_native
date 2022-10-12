import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {checkToken} from '../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../redux_toolkit/stores/store';
import LoginPage from '../screens/login/LoginPage';
import AddPatientPage from '../screens/patient/AddPatientPage';
import EditPatientPage from '../screens/patient/EditPatientPage';
import ListPatientPage from '../screens/patient/ListPatientPage';
import RegisterPage from '../screens/register/RegisterPage';
import SettingPage from '../screens/setting/SettingPage';
import SplashScreen from '../screens/SplashScreen';
import {getRefreshToken} from '../async_storage/asyncStorage';
type RootStackParamList = {
  login: undefined;
  register: undefined;
  layout: undefined;
  list: undefined;
  add: undefined;
  edit: undefined;
  setting: undefined;
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
        {authInfo.isLoading === 'fulfilled' && Boolean(getRefreshToken()) ? (
          <>
            <Stack.Screen name="list" component={ListPatientPage} />
            <Stack.Screen name="add" component={AddPatientPage} />
            <Stack.Screen name="edit" component={EditPatientPage} />
            <Stack.Screen name="setting" component={SettingPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
