import {ActivityIndicator, Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {register} from '../../services/backendCallUser';

import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import formStyles from '../styles/Form';

const RegisterForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const changePageToLogin = () => {
    navigation.navigate('login');
  };

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = async () => {
    if (password === confirmPassword) {
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
        ToastMessage(e.response.data.message, true);
      }
      setLoading(false);
    } else {
      ToastMessage('Both password must match', true);
    }
  };

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.elementTextLabel}>Display Name:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setName}
        value={name}
        placeholder="give your email here"
      />
      <Text style={formStyles.elementTextLabel}>Email:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setEmail}
        value={email}
        placeholder="give your email here"
      />
      <Text style={formStyles.elementTextLabel}>Password:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder="give your password here"
      />
      <Text style={formStyles.elementTextLabel}>Confirm Password:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        value={confirmPassword}
        placeholder="Confirm password"
      />

      <TouchableOpacity
        style={formStyles.elementButton}
        onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={formStyles.textInsideButton}>Register</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={formStyles.elementButton}
        onPress={changePageToLogin}>
        <Text style={formStyles.textInsideButton}>Already has account??</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
