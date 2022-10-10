import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import SettingForm from '../../components/setting/SettingForm';
import CustomDrawerOutlet from '../../components/utils/CustomDrawerOutlet';
import {safeAreaStyles} from '../login/LoginPage';

const SettingPage = () => {
  return (
    <CustomDrawerOutlet>
      <SafeAreaView style={safeAreaStyles.page}>
        <ScrollView>
          <SettingForm />
        </ScrollView>
      </SafeAreaView>
    </CustomDrawerOutlet>
  );
};

export default SettingPage;
