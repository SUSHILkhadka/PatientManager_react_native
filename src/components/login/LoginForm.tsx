import {Button, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {login} from '../../services/backendCallUser';
import {makeLoggedInWithInfo} from '../../redux_toolkit/slices/authSlice';
import {saveLoginResponse} from '../../services/asyncStorage';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';

const LoginForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('give your name here');
  const [email, setEmail] = useState<string>('give your email here');
  const [password, setPassword] = useState<string>('give your password here');

  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const response = await login(body);
      console.log(response);
      dispatch(makeLoggedInWithInfo(response));

      await saveLoginResponse(response);
      navigation.navigate('layout');
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
  };
  const changePageToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View>
      <Button
        title="new user Register??"
        onPress={changePageToRegister}></Button>
      <Text style={{color: 'red'}}>{authInfo.username}</Text>
      <TextInput onChangeText={setName} value={name} />
      <TextInput onChangeText={setEmail} value={email} />
      <TextInput onChangeText={setPassword} value={password} />
      <Button disabled={loading} title="Loginaa" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;
