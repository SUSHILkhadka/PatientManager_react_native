import {Button, ScrollView, Switch, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {changePage} from '../../redux_toolkit/slices/pageSlice';
import {editPatient} from '../../services/backendCallPatient';
import ListAllergy from '../allergy/ListAllergy';
import DatePicker from 'react-native-date-picker'

const EditPatientForm = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();

  console.log('patientinfo = ', patientInfo)
  console.log('type of  patientinfo.dob= ', typeof(patientInfo.dob))

  const [name, setName] = useState<string>(patientInfo.name);
  const [email, setEmail] = useState<string>(patientInfo.email);
  const [contact, setContact] = useState<string>(patientInfo.contact);
  const [dob, setDob] = useState<Date>(new Date(patientInfo.dob));
  const [address, setAddress] = useState<string>(patientInfo.address);
  const [specialAttention, setSpecialAttention] = useState<boolean>(
    patientInfo.specialAttention,
  );
  console.log('type of  dob= ',typeof(dob))

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
      <DatePicker date={dob} onDateChange={setDob} mode="date" />
      <TextInput onChangeText={setAddress} value={address} />
      <Switch onValueChange={setSpecialAttention} value={specialAttention} />
      <Text>List of allergius are:</Text>
      <ListAllergy patientId={patientInfo.patientId} />
      <Button disabled={loading} title="Edit patient" onPress={handleCreate} />
    </View>
  );
};

export default EditPatientForm;
