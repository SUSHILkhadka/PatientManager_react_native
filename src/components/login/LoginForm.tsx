import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
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
import CustomInput from '../utils/CustomInput';
import loginSchema from '../../validations/loginSchema';
import Validator from '../../validations/Validator';
const LoginForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    email: 'a@gmail.com',
    password: 'aaa',
  });

  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };

  const handleLogin = async () => {
    if (Validator(inputs, loginSchema, handleErrors)) {
      console.log(inputs);
      setLoading(true);
      const body = {
        email: inputs.email,
        password: inputs.password,
      };
      try {
        const response = await login(body);
        dispatch(makeLoggedInWithInfo(response));
        await saveLoginResponse(response);
        ToastMessage(response.message);
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message, true);
      }
      setLoading(false);
    }
  };

  const changePageToRegister = () => {
    navigation.navigate('register');
  };

  return (
    <View>
      <CustomInput
        placeholder="Enter your email address"
        label="Email"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'email')}
        error={errors.email}
        clearError={() => handleErrors('', 'email')}
      />
      <CustomInput
        placeholder="Enter your password"
        label="Password"
        iconName="lock-outline"
        hide={true}
        handleSetInput={(text: string) => handleSetInput(text, 'password')}
        error={errors.password}
        clearError={() => handleErrors('', 'password')}
      />
      <TouchableOpacity style={formStyles.elementButton} onPress={handleLogin}>
        {loading ? <ActivityIndicator /> : <Text style={formStyles.textInsideButton}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={formStyles.elementButton} onPress={changePageToRegister}>
        <Text style={formStyles.textInsideButton}>New User Register??</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
