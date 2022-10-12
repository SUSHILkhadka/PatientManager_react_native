import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import RegisterForm from '../../components/register/RegisterForm';
import {safeAreaStyles} from '../login/LoginPage';

const RegisterPage = () => {
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <ScrollView>
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;
