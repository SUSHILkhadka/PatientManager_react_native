import {Button, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import { register} from '../../services/backendCallUser';

import { AxiosError } from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState<string>('give your name here');
  const [email, setEmail] = useState<string>('give your email here');
  const [password, setPassword] = useState<string>('give your password here');

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
    } catch (e:AxiosError | any) {
        console.log(e.response.data.message);
    }
    setLoading(false);
  };

  return (
    <View>
      <Text>Register form starts</Text>

      <TextInput
        onChangeText={setName}
        value={name}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Button disabled={loading} title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterForm;
