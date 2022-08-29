import { StyleSheet } from "react-native";
import {primaryFontColor, secondaryBackgroundColor } from "./constants";

const patientCardStyle = StyleSheet.create({
    row: {
      margin: 5,
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderColor: "white",
      borderWidth: 1,
      borderRadius:50,
      backgroundColor:secondaryBackgroundColor

    },
    row_name:{
      color:primaryFontColor

    },
    image:{
      width: "10%",
      height:35,
      display:"flex",
      alignSelf: "center",
      backgroundColor: "pink",
      borderRadius:500,
    },
    deleteIcon: {
      backgroundColor: 'red',
      width: "10%",
      borderRadius:500,
      zIndex: 10,
    },
  
    icon: {
      textAlign: 'center',
    },
  });
  export default patientCardStyle;