import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {saveLoginResponse} from '../../async_storage/asyncStorage';
import {login} from '../../axios/backendCallUser';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IDataAtToken} from '../../redux_toolkit/Interfaces/IDataAtToken';
import {loadAuthInfoWithLoginInfo} from '../../redux_toolkit/slices/authSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {getDataFromJWTToken} from '../../utils/jwt.utils';
import loginSchema from '../../validations/schemas/loginSchema';
import Validator from '../../validations/Validator';
import formStyles from '../styles/Form';
import CustomInput from '../utils/CustomInput';
import ToastMessage, {showDefaultErrorMessage} from '../utils/ToastMessage';
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
      setLoading(true);
      const body = {
        email: inputs.email,
        password: inputs.password,
      };
      try {
        const response = await login(body);
        const authData = getDataFromJWTToken(response.refreshToken) as IDataAtToken;
        dispatch(loadAuthInfoWithLoginInfo(authData));
        await saveLoginResponse(response, authData.expiryDateForRefreshToken);
        ToastMessage(response.message);
      } catch (e: AxiosError | any) {
        showDefaultErrorMessage(e);
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
        value={inputs.email}
        placeholder="Enter your email address"
        label="Email"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'email')}
        error={errors.email}
        clearError={() => handleErrors('', 'email')}
      />
      <CustomInput
        value={inputs.password}
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
