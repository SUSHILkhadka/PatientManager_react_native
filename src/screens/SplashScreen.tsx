import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import { safeAreaStyles } from './login/LoginPage';

const SplashScreen = () => {
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <View>
      <Text>This is splash screen</Text>
        <img src="" alt="loading"/>
      </View>
    </SafeAreaView>
  );
};

const splashScreenStyle=StyleSheet.create({
    imageContainer:{
        width:"100%",
        height:Dimensions.get('window').height,
    }
})
export default SplashScreen;
