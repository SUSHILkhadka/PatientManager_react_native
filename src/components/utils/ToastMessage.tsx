import {Button, Text, StyleSheet, View,ToastAndroid} from 'react-native';
const ToastMessage=(message:string)=>{
    return(
      ToastAndroid.show(message, ToastAndroid.SHORT)  
    )
}

export default ToastMessage;
