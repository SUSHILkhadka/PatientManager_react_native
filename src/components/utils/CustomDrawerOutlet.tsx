import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useRef, useState} from 'react';
import {ActivityIndicator, DrawerLayoutAndroid, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import formStyles from '../../components/styles/Form';
import ToastMessage from '../../components/utils/ToastMessage';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {logoutAuthInfo} from '../../redux_toolkit/slices/authSlice';
import {AppDispatch, RootState} from '../../redux_toolkit/stores/store';
import {deleteLoginResponse} from '../../services/asyncStorage';
import {logout} from '../../services/backendCallUser';

const CustomDrawerOutlet = ({children}: any) => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {}
    dispatch(logoutAuthInfo());
    await deleteLoginResponse();
    setLoading(false);
  };

  const drawer = useRef<any>(null);
  const navigationView = () => (
    <View>
      <TouchableOpacity style={formStyles.elementButton} onPress={() => navigation.push('list')}>
        <Text style={formStyles.textInsideButton}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={formStyles.elementButton} onPress={() => navigation.push('setting')}>
        <Text style={formStyles.textInsideButton}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={formStyles.elementButton} onPress={handleLogout}>
        {loading ? <ActivityIndicator /> : <Text style={formStyles.textInsideButton}>Logout</Text>}
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid ref={drawer} drawerWidth={200} renderNavigationView={navigationView}>
      {children}
    </DrawerLayoutAndroid>
  );
};

export default CustomDrawerOutlet;
