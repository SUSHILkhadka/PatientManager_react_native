import { StyleSheet } from "react-native";
import {COLOR} from "./constants";

const patientCardStyle = StyleSheet.create({
    row: {
      margin: 13,
      padding: 5,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      borderColor: "white",
      borderWidth: 1.5,
      borderRadius:50,
      backgroundColor:COLOR.black2
    },
    row_texts:{
      position:"relative",
      left: 8,
    },
    row_name:{
      fontSize:16,
      color:COLOR.white1
    },
    row_email:{
      fontSize:12,
      color:COLOR.white2
    },
    image:{
      width: "10%",
      height:35,
      display:"flex",
      alignSelf: "center",
      backgroundColor: COLOR.white2,
      borderRadius:500,
    },
    favouriteIcon: {
      width: "20%",
      borderRadius:500,
      zIndex: 1,
      marginLeft:"auto",
      alignSelf:"flex-end",
    },
    deleteIcon: {
      backgroundColor: COLOR.pink2,
      width: "10%",
      borderRadius:500,
      zIndex: 10,
      marginLeft:30,
      marginRight: 5,
    },
    deleteIcon_text: {
      textAlign: 'center',
      fontSize: 18,
    },
  

  });
  export default patientCardStyle;