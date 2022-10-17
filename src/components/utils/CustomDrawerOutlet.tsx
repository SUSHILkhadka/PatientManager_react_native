import {useNavigation, useRoute} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, DrawerLayoutAndroid, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import formStyles from '../../components/styles/Form';
import ToastMessage, {showDefaultErrorMessage} from '../../components/utils/ToastMessage';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {logoutAuthInfo} from '../../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../../redux_toolkit/stores/store';
import {deleteLoginResponse} from '../../async_storage/asyncStorage';
import {logout} from '../../axios/backendCallUser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../styles/constants';

const CustomDrawerOutlet = ({children}: any) => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const route = useRoute();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      ToastMessage('logged out successfully');
    } catch (e: AxiosError | any) {
      showDefaultErrorMessage(e);
    }
    dispatch(logoutAuthInfo());
    await deleteLoginResponse();
    setLoading(false);
  };

  const drawer = useRef<any>(null);
  const navigationView = () => (
    <View>
      <TouchableOpacity style={formStyles.elementButton} onPress={() => navigation.replace('list')}>
        <Text style={formStyles.textInsideButton}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={formStyles.elementButton} onPress={() => navigation.replace('setting')}>
        <Text style={formStyles.textInsideButton}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={formStyles.elementButton} onPress={handleLogout}>
        {loading ? <ActivityIndicator /> : <Text style={formStyles.textInsideButton}>Logout</Text>}
      </TouchableOpacity>
    </View>
  );

  const CustomNavigationHeader = () => {
    return (
      <View style={styles.headerContainter}>
        <Icon style={styles.icon} name="hamburger" onPress={() => drawer.current.openDrawer()}></Icon>
        <Text style={styles.title}>{route.path == 'list' ? 'Home' : 'Setting'}</Text>
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid ref={drawer} drawerWidth={200} renderNavigationView={navigationView}>
      <CustomNavigationHeader />
      {children}
    </DrawerLayoutAndroid>
  );
};

const fontSize = 22;
const marginVertical = 16;
const marginHorizontal = 16;

const styles = StyleSheet.create({
  headerContainter: {
    backgroundColor: COLOR.black2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,
    fontSize: fontSize,
    color: COLOR.pink1,
  },
  title: {
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,

    fontSize: fontSize,
    color: COLOR.pink1,
  },
});

export default CustomDrawerOutlet;
