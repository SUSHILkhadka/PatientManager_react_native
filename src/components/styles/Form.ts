import {StyleSheet} from 'react-native';
import {
  COLOR,
  primaryBackgroundColor,
  primaryBorderColor,
  primaryButtonColor,
  primaryFontColor,
  secondaryFontColor,
} from './constants';

const formStyles = StyleSheet.create({
  container: {
    backgroundColor: primaryBackgroundColor,
    fontSize: 20,
  },
  elementTextLabel: {
    margin: 10,
    marginBottom: 4,
    fontSize: 25,
    color: primaryFontColor,
  },
  elementTextInput: {
    margin: 10,
    marginTop: 1,
    padding: 10,
    borderColor: primaryBorderColor,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 20,
    color: secondaryFontColor,
  },
  elementButton: {
    display: 'flex',
    width: '50%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: COLOR.pink1,
    alignSelf: 'center',
  },
  lastElementButton: {
    marginBottom: 150,
  },
  textInsideButton: {
    fontSize: 15,
    textAlign: 'center',
  },
  elementSwitch: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default formStyles;
