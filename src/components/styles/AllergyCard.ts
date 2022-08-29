import { StyleSheet } from "react-native";

const allergyCardStyles = StyleSheet.create({
    text: {
      margin: 10,
      padding: 7,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 10,
    },
    cardContainer: {
      position: 'relative',
      margin: 2,
    },
  
    deleteIcon: {
      backgroundColor: 'red',
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