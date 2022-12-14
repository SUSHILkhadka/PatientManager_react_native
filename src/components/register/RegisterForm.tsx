import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {register} from '../../axios/backendCallUser';

import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import registerSchema from '../../validations/schemas/registerSchema';
import {asyncValidator} from '../../validations/Validator';
import formStyles from '../styles/Form';
import CustomInput from '../Customs/CustomInput';
import ToastMessage, {showDefaultErrorMessage} from '../../utils/ToastMessage.utils';

const RegisterForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const changePageToLogin = () => {
    navigation.navigate('login');
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };

  const handleRegister = async () => {
    setLoading(true);
    if (await asyncValidator(inputs, registerSchema, handleErrors)) {
      const body = {
        name: inputs.name.trim(),
        email: inputs.email,
        password: inputs.password,
      };
      try {
        const response = await register(body);
        ToastMessage(response.message);
        changePageToLogin();
      } catch (e: AxiosError | any) {
        showDefaultErrorMessage(e);
      }
    }

    setLoading(false);
  };

  return (
    <View>
      <CustomInput
        placeholder="Enter your name"
        label="Name"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'name')}
        error={errors.name}
        clearError={() => handleErrors('', 'name')}
      />
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
      <CustomInput
        placeholder="Enter your confirm password"
        label="Confirm Password"
        iconName="lock-outline"
        hide={true}
        handleSetInput={(text: string) => handleSetInput(text, 'confirmPassword')}
        error={errors.confirmPassword}
        clearError={() => handleErrors('', 'confirmPassword')}
      />

      <TouchableOpacity style={formStyles.elementButton} onPress={handleRegister}>
        {loading ? <ActivityIndicator /> : <Text style={formStyles.textInsideButton}>Register</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={formStyles.elementButton} onPress={changePageToLogin}>
        <Text style={formStyles.textInsideButton}>Already has account??</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
