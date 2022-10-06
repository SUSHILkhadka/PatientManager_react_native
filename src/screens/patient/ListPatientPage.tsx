import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  DrawerLayoutAndroid,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  AppState,
} from 'react-native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import SelectDropdown from 'react-native-select-dropdown';
import PatientTable from '../../components/patient/PatientTable';
import ToastMessage from '../../components/utils/ToastMessage';
import {AxiosError} from 'axios';
import {logout} from '../../services/backendCallUser';
import {checkToken, makeLoggedOut} from '../../redux_toolkit/slices/authSlice';
import {deleteLoginResponse} from '../../services/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch, RootState} from '../../redux_toolkit/stores/store';
import {safeAreaStyles} from '../login/LoginPage';
import {COLOR} from '../../components/styles/constants';
import formStyles from '../../components/styles/Form';

const ListPatientPage = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const goToAddPatientPage = () => {
    navigation.navigate('add');
  };
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await logout();
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {}
    dispatch(makeLoggedOut());
    await deleteLoginResponse();
    setLoading(false);
  };

  const drawer = useRef<any>(null);
  const navigationView = () => (
    <TouchableOpacity style={formStyles.elementButton} onPress={handleLogout}>
      {loading ? <ActivityIndicator /> : <Text style={formStyles.textInsideButton}>Logout</Text>}
    </TouchableOpacity>
  );

  return (
    <DrawerLayoutAndroid ref={drawer} drawerWidth={200} renderNavigationView={navigationView}>
      <SafeAreaView style={safeAreaStyles.page}>
        <View>
          <TouchableOpacity style={styles.addIcon} onPress={goToAddPatientPage}>
            <Text style={styles.addIcon_text}>+</Text>
          </TouchableOpacity>
          <PatientTable />
        </View>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

const stylesDrawer = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: COLOR.white2,
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 40,
    width: '20%',
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 400,
    position: 'absolute',
    backgroundColor: COLOR.pink2,
    opacity: 0.7,
    top:
      Dimensions.get('window').height > 500
        ? Dimensions.get('window').height * 0.85
        : Dimensions.get('window').height * 0.7,
    right: 40,
  },
  addIcon_text: {
    color: COLOR.white1,
    fontSize: 40,
    alignSelf: 'center',
  },
});

const styleDropDown = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    marginLeft: 'auto',
    zIndex: 2,
  },
});
export default ListPatientPage;
