import {Button, Switch, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {changePage} from '../../redux_toolkit/slices/pageSlice';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {addPatient} from '../../services/backendCallPatient';
import DatePicker from 'react-native-date-picker'
const BasicPatientForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('name ');
  const [email, setEmail] = useState<string>('email');
  const [contact, setContact] = useState<string>('phone no');
  const [dob, setDob] = useState<Date>(new Date());
  const [address, setAddress] = useState<string>('address');
  const [specialAttention, setSpecialAttention] = useState<boolean>(false);
  const [allergies, setAllergies] = useState<string>('give your email here');

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
      const response = await addPatient(body);
      ToastMessage(response.message);
    changePageToListPatient();
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message,true);
    }
    setLoading(false);
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
      <TextInput onChangeText={setAllergies} value={allergies} />

      <Button disabled={loading} title="Add new patient" onPress={handleCreate} />
    </View>
  );
};

export default BasicPatientForm;
