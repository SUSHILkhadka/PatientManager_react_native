import {Button, Switch, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {changePage} from '../../redux_toolkit/slices/pageSlice';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {editPatient} from '../../services/backendCallPatient';
import ListAllergy from '../allergy/ListAllergy';

const EditPatientForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();

  const [name, setName] = useState<string>(patientInfo.name);
  const [email, setEmail] = useState<string>(patientInfo.email);
  const [contact, setContact] = useState<string>(patientInfo.contact);
  const [dob, setDob] = useState<string>(patientInfo.dob);
  const [address, setAddress] = useState<string>(patientInfo.address);
  const [specialAttention, setSpecialAttention] = useState<boolean>(
    patientInfo.specialAttention,
  );
  const [allergies, setAllergies] = useState<string>(patientInfo.allergies);

  const [loading, setLoading] = useState<boolean>(false);
  const handleCreate = async () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      contact: contact,
      dob: dob,
      address: address,
      specialAttention: specialAttention,
      allergies: allergies,
      photoUrl: email,
    };
    try {
      const response = await editPatient(body, patientInfo.patientId);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
    changePageToListPatient();
  };
  const changePageToListPatient = () => {
    dispatch(changePage(1));
  };

  return (
    <View>
      <TextInput onChangeText={setName} value={name} />
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setContact} value={contact} />
      <TextInput onChangeText={setDob} value={dob} />
      <TextInput onChangeText={setAddress} value={address} />
      <Switch onValueChange={setSpecialAttention} value={specialAttention} />
      <Text>List of allergius are:</Text>
      <ListAllergy patientId={patientInfo.patientId} />
      <Button disabled={loading} title="Edit patient" onPress={handleCreate} />
    </View>
  );
};

export default EditPatientForm;
