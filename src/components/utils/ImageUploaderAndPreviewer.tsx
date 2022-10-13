import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {COLOR} from '../styles/constants';
import styleImage from '../styles/Image';
type Prop = {
  pickerResponse: any;
  setPickerResponse: any;
  previousUrl?: string;
};
const ImageUploaderAndPreviewer = ({pickerResponse, setPickerResponse, previousUrl}: Prop) => {
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
      });
      setPickerResponse(res);
    } catch {}
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: pickerResponse
              ? pickerResponse.uri
              : previousUrl
              ? previousUrl
              : 'https://api.minimalavatars.com/avatar/random/png',
          }}
        />
      </View>

      <TouchableOpacity style={styles.addIcon} onPress={selectOneFile}>
        <Text style={styles.plus}> +</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  imageContainer: {
    width: '50%',

    display: 'flex',
    alignSelf: 'center',
    borderColor: COLOR.white1,
    borderWidth: 1.5,
    borderRadius: 500,
    backgroundColor: COLOR.black2,

    shadowColor: '#f31414',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
  avatar: {
    width: '100%',
    height: 200,
    display: 'flex',
    alignSelf: 'center',

    borderRadius: 500,

    shadowColor: '#f31414',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
  plus: {
    fontSize: 50,
    width: '30%',
    color: COLOR.white1,
    opacity: 0.5,
  },
  addIcon: {
    width: 200,
    height: 200,
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    top: 59,
    left: '45%',
  },
});
export default ImageUploaderAndPreviewer;
