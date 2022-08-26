import {
  Button,
  Image,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {changePage} from '../../redux_toolkit/slices/pageSlice';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {addPatient} from '../../services/backendCallPatient';
import formStyles from '../styles/Form';
import CustomDatePicker from '../utils/CustomDatePicker';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from 'react-native-document-picker';
import styleImage from '../styles/Image';
import {uploadFile} from '../../services/uploadFile';

const BasicPatientForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [contact, setContact] = useState<string>();
  const [dob, setDob] = useState<Date>(new Date());
  const [address, setAddress] = useState<string>();
  const [specialAttention, setSpecialAttention] = useState<boolean>(false);
  const [photoUrl, changePhotoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [pickerResponse, setpickerResponse] = useState<any>();
  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
      });
      setpickerResponse(res);
    } catch (err) {
      console.log(err);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled from single doc picker');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      contact: contact,
      dob: dob,
      address: address,
      specialAttention: specialAttention,
      photoUrl: pickerResponse? await uploadFile(pickerResponse):"",
    };
    try {
      const response = await addPatient(body);
      ToastMessage(response.message);
      changePageToListPatient();
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoading(false);
  };
  const changePageToListPatient = () => {
    dispatch(changePage(1));
  };

  return (
    <View style={formStyles.container}>
      <Image
        style={styleImage.avatar}
        source={{
          uri: pickerResponse
            ? pickerResponse.uri
            : 'https://api.minimalavatars.com/avatar/random/png',
        }}
      />

      <Button title="upload image" onPress={selectOneFile}></Button>
      <Text style={formStyles.elementTextLabel}>Patient Name:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setName}
        value={name}
        placeholder="enter patient name"
      />
      <Text style={formStyles.elementTextLabel}>Patient Email:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setEmail}
        value={email}
        placeholder="enter patient email"
      />
      <Text style={formStyles.elementTextLabel}>Phone No:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setContact}
        value={contact}
        keyboardType="phone-pad"
        placeholder="enter patient phone no"
      />
      <Text style={formStyles.elementTextLabel}>Date of birth</Text>
      <CustomDatePicker dob={dob} setDob={setDob} />
      <Text style={formStyles.elementTextLabel}>Address:</Text>
      <TextInput
        style={formStyles.elementTextInput}
        onChangeText={setAddress}
        value={address}
        placeholder="enter patient adress"
      />
      <View style={formStyles.elementSwitch}>
        <Text style={formStyles.elementTextLabel}>Special Attention:</Text>
        <Switch onValueChange={setSpecialAttention} value={specialAttention} />
      </View>

      <TouchableOpacity disabled={loading} style={formStyles.elementButton} onPress={handleCreate}>
        <Text style={formStyles.textInsideButton}>Add new Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicPatientForm;
