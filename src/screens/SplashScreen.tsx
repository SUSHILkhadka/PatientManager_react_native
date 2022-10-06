import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLOR} from '../components/styles/constants';
import {safeAreaStyles} from './login/LoginPage';

const SplashScreen = () => {
  return (
    <SafeAreaView testID="main" style={safeAreaStyles.page}>
      <View style={splashScreenStyle.textContainer}>
        <Text testID="ff" style={splashScreenStyle.title}>
          Patient PM
        </Text>
        <ActivityIndicator size={40} color={COLOR.pink2} />
      </View>
    </SafeAreaView>
  );
};

const splashScreenStyle = StyleSheet.create({
  textContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    backgroundColor: COLOR.black1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLOR.pink1,
    fontSize: 40,
    fontWeight: 'bold',
  },
});
export default SplashScreen;
