import {StyleSheet} from 'react-native';
import {COLOR} from './constants';

export const patientTable = StyleSheet.create({
  percentableIndicator: {
    // position:"absolute",
    zIndex: 10,
    backgroundColor: COLOR.pink1,
    height: 3,
  },
  container: {
    marginTop: 10,
  },
});
