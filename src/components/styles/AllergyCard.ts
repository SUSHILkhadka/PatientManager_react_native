import {StyleSheet} from 'react-native';
import {COLOR} from './constants';

const allergyCardStyles = StyleSheet.create({
  text: {
    margin: 10,
    padding: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: COLOR.pink2,
    borderWidth: 1,
    borderRadius: 10,
  },
  cardContainer: {
    position: 'relative',
    margin: 2,
  },

  deleteIcon: {
    backgroundColor: COLOR.pink1,
    width: 20,
    position: 'absolute',
    right: -10,
    top: 10,
    borderRadius: 10,
    zIndex: 10,
  },

  icon: {
    textAlign: 'center',
  },
});
export default allergyCardStyles;
