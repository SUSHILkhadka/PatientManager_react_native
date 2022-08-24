import {Button, Text, TextInput, View,ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {login} from '../../services/backendCallUser';
import {makeLoggedInWithInfo} from '../../redux_toolkit/slices/authSlice';
import {
  saveAccessToken,
  saveLoginResponse,
  saveRefreshToken,
  setLogStatus,
} from '../../services/localStorageAndCookies';
import { AxiosError } from 'axios';
const LoginForm = () => {
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
    console.log('gg')
    try {
      const response = await login(body);
      console.log(response);
      dispatch(makeLoggedInWithInfo(response));

      await saveLoginResponse(JSON.stringify(response));
      await saveAccessToken(response.accessToken);
      await saveRefreshToken(
        response.refreshToken,
        response.expiresAtRefreshToken,
      );
      await setLogStatus(true);
      console.log('fff')
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
    } catch (e:AxiosError | any) {
      console.log(e.response.data.message);
      ToastAndroid.show(e.response.data.message, ToastAndroid.SHORT);

  }
    setLoading(false);

  };

  return (
    <View>
      <Text>{authInfo.username}</Text>
      <Text>ff</Text>

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
      <Button disabled={loading} title="Loginaa" onPress={handleLogin} />
    </View>
  );
};

export default LoginForm;
