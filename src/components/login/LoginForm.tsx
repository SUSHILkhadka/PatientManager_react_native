import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
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
import formStyles from '../styles/Form';

const LoginForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('A');
  const [password, setPassword] = useState<string>('a');

  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async () => {
    setLoading(true);
    const body = {
      email: email,
      password: password,
    };
    try {
      const response = await login(body);
      dispatch(makeLoggedInWithInfo(response));

      await saveLoginResponse(response);
      navigation.navigate('layout');
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoading(false);
  };
  const changePageToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.elementTextLabel}>Email:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setEmail}
        value={email}
        placeholder='give your email here'
      />
      <Text style={formStyles.elementTextLabel}>Password:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder='give your password here'

      />
      <TouchableOpacity style={formStyles.elementButton} onPress={handleLogin}>
        <Text style={formStyles.textInsideButton}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={formStyles.elementButton} onPress={changePageToRegister}>
        <Text style={formStyles.textInsideButton}>New User Register??</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
