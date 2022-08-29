import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import SelectDropdown from 'react-native-select-dropdown';
import PatientTable from '../../components/patient/PatientTable';
import ToastMessage from '../../components/utils/ToastMessage';
import {AxiosError} from 'axios';
import {logout} from '../../services/backendCallUser';
import {makeLoggedOut} from '../../redux_toolkit/slices/authSlice';
import {deleteLoginResponse} from '../../services/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { RootState } from '../../redux_toolkit/stores/store';

const ListPatientPage = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const goToAddPatientPage = () => {
    navigation.navigate('add');
  };

  const dropDownButtons = ['settings', 'logout'];
  const handleDropDownSelection = (selectedItem: string) => {
    switch (selectedItem) {
      case 'logout':
        return handleLogout();
    }
  };
  const handleLogout = async () => {
    try {
      const response = await logout();
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {

    }
    console.log("here",authInfo)
    dispatch(makeLoggedOut());
    await deleteLoginResponse();
  };

  return (
    <View>
      <TouchableOpacity style={styles.addIcon} onPress={goToAddPatientPage}>
        <Text style={styles.addIcon_text}>+</Text>
      </TouchableOpacity>

      <View style={styleDropDown.container}>
        <SelectDropdown
          data={dropDownButtons}
          onSelect={(selectedItem, _index) => {
            handleDropDownSelection(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, _index) => {
            return item;
          }}
        />
      </View>
      <PatientTable />
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 40,
    width: 50,
    alignSelf: 'center',
    zIndex: 2,
    borderRadius: 400,
    position: 'absolute',
    top: 600,
    right: 40,

    shadowColor: '#0afe0a',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  addIcon_text: {
    color: 'green',
    fontSize: 40,
    alignSelf: 'center',
  },
});

const styleDropDown = StyleSheet.create({
  container: {
    display: 'flex',
    alignSelf: 'flex-end',
  },
});
export default ListPatientPage;
