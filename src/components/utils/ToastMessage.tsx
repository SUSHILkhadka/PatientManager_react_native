import {ToastAndroid} from 'react-native';
import Snackbar from 'react-native-snackbar';
const ToastMessage = (message: string, error?: boolean) => {
  // return(
  //   ToastAndroid.show(message, ToastAndroid.SHORT)
  // )
  return Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: error ? '#ff4d21' : '#1cae68',
  });
};

export const showDefaultErrorMessage = (e: any) => {
  try {
    ToastMessage(e.response.data.message, true);
  } catch {
    if (e.message == 'Network Error') ToastMessage('No internet connection.', true);
    else ToastMessage('Something went wrong. Please try later', true);
  }
};

export default ToastMessage;
