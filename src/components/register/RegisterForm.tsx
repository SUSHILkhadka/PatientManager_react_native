import {Button, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {register} from '../../services/backendCallUser';

import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import { useDispatch } from 'react-redux';
import { changePage } from '../../redux_toolkit/slices/pageSlice';
import { useNavigation } from '@react-navigation/native';
import { typeOfUseNavigationHook } from '../../navigator/Navigator';

const RegisterForm = () => {
  const navigation:typeOfUseNavigationHook['navigation']=useNavigation();
  const changePageToLogin=()=>{
    navigation.navigate("login");
  }

  const [name, setName] = useState<string>('give your name here');
  const [email, setEmail] = useState<string>('give your email here');
  const [password, setPassword] = useState<string>('give your password here');
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = async () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await register(body);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message,true);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Register form starts</Text>
      <Button title='Already has account' onPress={changePageToLogin}></Button>

      <TextInput
        onChangeText={setName}
        value={name}
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
      />
      <Button disabled={loading} title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterForm;
