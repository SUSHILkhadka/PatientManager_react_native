import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import LoginForm from '../../components/login/LoginForm';
import {COLOR} from '../../components/styles/constants';

const LoginPage = () => {
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <LoginForm />
    </SafeAreaView>
  );
};
export const safeAreaStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLOR.black1,
  },
});
export default LoginPage;
