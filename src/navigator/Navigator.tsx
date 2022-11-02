import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {getRefreshToken} from '../async_storage/asyncStorage';
import {COLOR} from '../components/styles/constants';
import {checkToken} from '../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../redux_toolkit/stores/store';
import LoginPage from '../screens/login/LoginPage';
import AddPatientPage from '../screens/patient/AddPatientPage';
import EditPatientPage from '../screens/patient/EditPatientPage';
import ListPatientPage from '../screens/patient/ListPatientPage';
import RegisterPage from '../screens/register/RegisterPage';
import SettingPage from '../screens/setting/SettingPage';
import SplashScreen from '../screens/SplashScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/Customs/CustomDrawer';
const Drawer = createDrawerNavigator();

type RootStackParamList = {
  main: undefined;
  login: undefined;
  register: undefined;
  list: undefined;
  add: undefined;
  edit: undefined;
  setting: undefined;
  drawer: undefined;
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

  const DrawerContent = () => {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={drawerScreenOptions}>
        <Drawer.Screen
          name="list"
          component={ListPatientPage}
          options={{
            ...drawerItemsOptions,
            title: 'Home',
            drawerIcon: props => <Ionicons {...props} name="list" />,
          }}
        />
        <Drawer.Screen
          name="setting"
          component={SettingPage}
          options={{
            ...drawerItemsOptions,
            title: 'Setting',
            drawerIcon: props => <Ionicons {...props} name="settings" />,
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackScreenrOptions}>
        {authInfo.isLoading === 'fulfilled' && Boolean(getRefreshToken()) ? (
          <Stack.Group>
            <Stack.Screen name="drawer" component={DrawerContent} options={{headerShown: false}} />
            <Stack.Screen name="add" component={AddPatientPage} options={{title: 'Add new Patient'}} />
            <Stack.Screen name="edit" component={EditPatientPage} options={{title: 'Edit Patient'}} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterPage} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const stackScreenrOptions = {
  headerStyle: {backgroundColor: COLOR.black2},
  headerTintColor: COLOR.pink1,
};

const drawerScreenOptions = {
  headerStyle: {backgroundColor: COLOR.black2},
  headerTintColor: COLOR.pink1,
};

const drawerItemsOptions = {
  drawerActiveBackgroundColor: COLOR.pink1,
  drawerActiveTintColor: 'white',
  drawerInactiveTintColor: COLOR.pink1,
};
export default Navigator;
