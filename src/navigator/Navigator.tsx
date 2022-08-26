import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterPage from '../screens/register/RegisterPage';
import LoginPage from '../screens/login/LoginPage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
type RootStackParamList = {
  login: any;
  register: any;
};

export type typeOfUseNavigationHook = NativeStackScreenProps<RootStackParamList>;

const Navigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const Tab = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="login"
        screenOptions={{
          // headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen
          name="login"
          options={{
            title: 'gg',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={LoginPage}
        />
        <Stack.Screen name="register" component={RegisterPage} options={{}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
