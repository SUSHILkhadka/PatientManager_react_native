import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';

import LoginForm from './src/components/login/LoginForm';
import RegisterForm from './src/components/register/RegisterForm';

import {useSelector} from 'react-redux';
import {RootState} from './src/redux_toolkit/stores/store';
import Navigator from "./src/navigator/Navigator"


const App = () => {

  const pageInfo = useSelector((state: RootState) => state.page);
  const getPage = () => {
    switch (pageInfo.page) {
      case 2:
        return <LoginForm />;
      case 1:
        return <RegisterForm />;
    }
  };




  return(
    <Navigator/>
  )
};

export default App;
