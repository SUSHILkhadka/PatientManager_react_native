import {useNavigation} from '@react-navigation/native';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import PatientTable from '../../components/patient/PatientTable';
import {COLOR} from '../../components/styles/constants';
import CustomDrawerOutlet from '../../components/utils/CustomDrawerOutlet';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {AppDispatch, RootState} from '../../redux_toolkit/stores/store';
import {safeAreaStyles} from '../login/LoginPage';

const ListPatientPage = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  const goToAddPatientPage = () => {
    navigation.navigate('add');
  };

  return (
    <CustomDrawerOutlet>
      <SafeAreaView style={safeAreaStyles.page}>
        <View>
          <TouchableOpacity style={styles.addIcon} onPress={goToAddPatientPage}>
            <Text style={styles.addIcon_text}>+</Text>
          </TouchableOpacity>
          <PatientTable />
        </View>
      </SafeAreaView>
    </CustomDrawerOutlet>
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
