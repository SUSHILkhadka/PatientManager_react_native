import {StyleSheet} from 'react-native';

const styleImage = StyleSheet.create({
  container:{

  },
  avatar: {
    width: "50%",
    height: 200,
    display:"flex",
    alignSelf: "center",
    borderWidth: 2,
    backgroundColor: "pink",
    borderRadius:500

  },
  addIcon: {
    width: 200,
    height: 200,
    position: 'absolute',
    display:"flex",
    alignSelf: "center",
    top: 59,
    left: "45%",
  },
});
export default styleImage;
