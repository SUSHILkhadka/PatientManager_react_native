// import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRefreshToken} from '../async_storage/asyncStorage';
import {COLOR} from '../components/styles/constants';
import {checkToken} from '../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../redux_toolkit/stores/store';
import APage from '../screens/APage';
import BPage from '../screens/BPage';
import LoginPage from '../screens/login/LoginPage';
import AddPatientPage from '../screens/patient/AddPatientPage';
import EditPatientPage from '../screens/patient/EditPatientPage';
import ListPatientPage from '../screens/patient/ListPatientPage';
import RegisterPage from '../screens/register/RegisterPage';
import SettingPage from '../screens/setting/SettingPage';
import SplashScreen from '../screens/SplashScreen';
type RootStackParamList = {
  login: undefined;
  register: undefined;
  list: undefined;
  add: undefined;
  edit: undefined;
  setting: undefined;
};

type RootStackParamListForDrawer = {
  a: undefined;
  b: undefined;
};
export type typeOfUseNavigationHook = NativeStackScreenProps<RootStackParamList>;

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  // const Drawer = createDrawerNavigator<RootStackParamListForDrawer>();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  if (authInfo.isLoading == 'loading') {
    return <SplashScreen />;
  }

  const screenHeaderOptions = {
    headerStyle: {backgroundColor: COLOR.black2},
    headerTintColor: COLOR.pink1,
  };

  // const DrawerNavigator = () => {
  //   return (
  //     <Drawer.Navigator>
  //       <Drawer.Screen name="a" component={APage} options={{title: 'a'}} />
  //       <Drawer.Screen name="b" component={BPage} options={{title: 'b'}} />
  //     </Drawer.Navigator>
  //   );
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenHeaderOptions}>
        {authInfo.isLoading === 'fulfilled' && Boolean(getRefreshToken()) ? (
          <Stack.Group>
            <Stack.Screen name="list" component={ListPatientPage} options={{title: 'Home'}} />
            <Stack.Screen name="add" component={AddPatientPage} options={{title: 'Add new Patient'}} />
            <Stack.Screen name="edit" component={EditPatientPage} options={{title: 'Edit Patient'}} />
            <Stack.Screen name="setting" component={SettingPage} options={{title: 'Setting'}} />
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

export default Navigator;
