import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styleImage from '../styles/Image';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from 'react-native-document-picker';
type Prop = {
  pickerResponse: any;
  setPickerResponse: any;
  previousUrl?: string;
};
const ImageUploaderAndPreviewer = ({
  pickerResponse,
  setPickerResponse,
  previousUrl,
}: Prop) => {
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
      });
      setPickerResponse(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View>
      <Image
        style={styleImage.avatar}
        source={{
          uri: pickerResponse
            ? pickerResponse.uri
            : previousUrl
            ? previousUrl
            : 'https://api.minimalavatars.com/avatar/random/png',
        }}
      />
      <TouchableOpacity style={styleImage.addIcon} onPress={selectOneFile}>
        <Text style={styles.plus}> +</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plus: {
    fontSize: 50,
    width: '30%',
    color: 'black',
    opacity:0.7,
    borderRadius: 50,
  },
});
export default ImageUploaderAndPreviewer;
