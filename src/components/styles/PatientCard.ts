import { StyleSheet } from "react-native";

const patientCardStyle = StyleSheet.create({
    row: {
      margin: 5,
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'baseline',
      borderColor: "white",
      borderWidth: 1,
      borderRadius:50

    },
    image:{
      width: "10%",
      height:35,
      display:"flex",
      alignSelf: "center",
      backgroundColor: "pink",
      borderRadius:500,
    }
  });
  export default patientCardStyle;