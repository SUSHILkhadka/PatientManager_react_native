import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllAllergiesByPatientId} from '../../axios/backendCallAllergy';
import PatientForm from '../../components/patient/PatientForm';
import ToastMessage, {showDefaultErrorMessage} from '../../components/utils/ToastMessage';
import {loadAllergyList, resetAllergyList} from '../../redux_toolkit/slices/allergySlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {safeAreaStyles} from '../login/LoginPage';
const EditPatientPage = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();

  const initialValue = {
    patientId: patientInfo.patientId,
    name: patientInfo.name,
    email: patientInfo.email,
    contact: patientInfo.contact,
    address: patientInfo.address,
    dob: patientInfo.dob,
    specialAttention: patientInfo.specialAttention,
    photoUrl: patientInfo.photoUrl,
  };

  useEffect(() => {
    let isMounted = true;
    dispatch(resetAllergyList());

    const getAllAllergyOfPatient = async () => {
      try {
        const response = await getAllAllergiesByPatientId(patientInfo.patientId);
        if (isMounted) {
          dispatch(loadAllergyList(response.data));
        }
      } catch (e: any) {
        try {
          ToastMessage(e.response.data.message, true);
        } catch {
          showDefaultErrorMessage();
        }
      }
    };
    getAllAllergyOfPatient();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <ScrollView>
        <PatientForm initialValue={initialValue} />
      </ScrollView>
    </SafeAreaView>
  );
};
export default EditPatientPage;
