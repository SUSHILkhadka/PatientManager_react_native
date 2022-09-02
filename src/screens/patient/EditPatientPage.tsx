import React from 'react';
import {SafeAreaView,ScrollView} from 'react-native';
import EditPatientForm from '../../components/patient/EditPatientForm';
import { safeAreaStyles } from '../login/LoginPage';
const EditPatientPage = () => {
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <ScrollView>
        <EditPatientForm />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditPatientPage;
