import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch} from 'react-redux';
import PatientForm from '../../components/patient/PatientForm';
import {resetAllergyList} from '../../redux_toolkit/slices/allergySlice';
import {defaultValue, resetPatient} from '../../redux_toolkit/slices/patientSlice';
import {safeAreaStyles} from '../login/LoginPage';
const AddPatientPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPatient());
    dispatch(resetAllergyList());
  }, []);
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <ScrollView>
        <PatientForm initialValue={defaultValue} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default AddPatientPage;
