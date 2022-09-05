import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {safeAreaStyles} from './login/LoginPage';

const SplashScreen = () => {
  return (
    <SafeAreaView style={safeAreaStyles.page}>
      <View>
        <Text>This is splash screen</Text>
        <Image
          source={{
            uri: 'https://api.minimalavatars.com/avatar/random/png',
          }}
        />
        <Text>ff</Text>
      </View>
    </SafeAreaView>
  );
};

const splashScreenStyle = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
});
export default SplashScreen;
