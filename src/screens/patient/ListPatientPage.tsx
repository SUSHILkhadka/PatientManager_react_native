import {useNavigation} from '@react-navigation/native';
import {Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect} from 'react';

import {useSelector} from 'react-redux';
import PatientTable from '../../components/patient/PatientTable';
import {COLOR} from '../../components/styles/constants';
import CustomDrawerOutlet from '../../components/utils/CustomDrawerOutlet';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {RootState} from '../../redux_toolkit/stores/store';
import {safeAreaStyles} from '../login/LoginPage';

const ListPatientPage = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions?.({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={goToAddPatientPage}>
            <Text style={styles.addIcon_text}>+</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);
  const goToAddPatientPage = () => {
    navigation.navigate('add');
  };

  return (
    <CustomDrawerOutlet>
      <SafeAreaView style={safeAreaStyles.page}>
        <View>
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
  addIcon_text: {
    color: COLOR.pink1,
    fontSize: 40,
    alignSelf: 'center',
  },
});

const styleDropDown = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    marginLeft: 'auto',
    marginHorizontal: 10,
    zIndex: 2,
  },
});
export default ListPatientPage;
