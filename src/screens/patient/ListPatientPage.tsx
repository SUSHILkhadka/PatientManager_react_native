import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import PatientTable from '../../components/patient/PatientTable';
import {COLOR} from '../../components/styles/constants';
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
            <Ionicons style={styles.addIcon_text} name="person-add" />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);
  const goToAddPatientPage = () => {
    navigation.navigate('add');
  };

  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <View>
        <PatientTable />
      </View>
    </SafeAreaView>
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
    fontSize: 32,
    alignSelf: 'center',
    marginRight: 16,
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
