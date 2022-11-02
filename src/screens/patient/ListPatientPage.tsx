import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PatientTable from '../../components/patient/PatientTable';
import {COLOR} from '../../components/styles/constants';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {safeAreaStyles} from '../login/LoginPage';

const ListPatientPage = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions?.({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigation.navigate('add')}>
            <Ionicons style={styles.addIcon_text} name="person-add" />
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <View>
        <PatientTable />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addIcon_text: {
    color: COLOR.pink1,
    fontSize: 32,
    alignSelf: 'center',
    marginRight: 16,
  },
});

export default ListPatientPage;
