import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet, DrawerLayoutAndroid, Text, TouchableOpacity, View, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import formStyles from '../styles/Form';
import ToastMessage, {showDefaultErrorMessage} from './ToastMessage';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {logoutAuthInfo} from '../../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../../redux_toolkit/stores/store';
import {deleteLoginResponse} from '../../async_storage/asyncStorage';
import {logout} from '../../axios/backendCallUser';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOR} from '../styles/constants';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';

const CustomDrawer = (props: any) => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  // const route = useRoute();

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

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.infoContainter}>
        <Text style={styles.nameContainer}>{authInfo.username}</Text>
        <Text style={styles.emailContainer}>{authInfo.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        // activeBackgroundColor={COLOR.pink1}
        {...props}
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
      <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
        <Icon style={styles.icon} name="logout" />
        <View style={styles.titleContainer}>
          {loading ? <ActivityIndicator size={18} color={COLOR.pink1} /> : <Text style={styles.title}>Logout</Text>}
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const fontSize = 22;
const marginVertical = 16;
const marginHorizontal = 8;

const styles = StyleSheet.create({
  infoContainter: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 8,
  },
  nameContainer: {
    color: COLOR.pink1,
    fontSize: 20,
  },
  emailContainer: {
    color: COLOR.pink1,
    fontSize: 16,
  },
  logoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 4,
  },
  icon: {
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal,
    fontSize: fontSize,
    color: COLOR.pink1,
  },
  titleContainer: {
    marginVertical: marginVertical,
    marginHorizontal: marginHorizontal * 3,
  },
  title: {
    fontSize: 16,
    color: COLOR.pink1,
  },
});

export default CustomDrawer;
