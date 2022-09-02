import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {useNavigation} from '@react-navigation/native';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {addPatient} from '../../services/backendCallPatient';
import formStyles from '../styles/Form';
import CustomDatePicker from '../utils/CustomDatePicker';
import {uploadFile} from '../../services/uploadFile';
import ImageUploaderAndPreviewer from '../utils/ImageUploaderAndPreviewer';
import {RootState} from '../../redux_toolkit/stores/store';
import CustomInput from '../utils/CustomInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles as customInputStyles} from '../utils/CustomInput';
import {COLOR} from '../styles/constants';
import Validator from '../../validations/Validator';
import patientSchema from '../../validations/patientSchema';

const BasicPatientForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const [dob, setDob] = useState<Date>(new Date());
  const [specialAttention, setSpecialAttention] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pickerResponse, setPickerResponse] = useState<any>();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });
  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };

  const handleCreate = async () => {
    if (Validator({...inputs, dob}, patientSchema, handleErrors)) {
      setLoading(true);
      const body = {
        name: inputs.name,
        email: inputs.email,
        contact: inputs.contact,
        dob: dob,
        address: inputs.address,
        specialAttention: specialAttention,
        photoUrl: pickerResponse ? await uploadFile(pickerResponse) : '',
      };
      try {
        const response = await addPatient(body);
        ToastMessage(response.message);
        changePageToListPatient();
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message, true);
      }
      setLoading(false);
    }
  };

  const changePageToListPatient = () => {
    dispatch(refreshPage(!pageInfo.refreshFlag));
    navigation.navigate('list');
  };

  return (
    <View>
      <ImageUploaderAndPreviewer
        pickerResponse={pickerResponse}
        setPickerResponse={setPickerResponse}
      />
      <CustomInput
        placeholder="Enter patient name"
        label="Patient Name"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'name')}
        error={errors.name}
        clearError={() => handleErrors('', 'name')}
      />
      <CustomInput
        placeholder="Enter patient email address"
        label="Patient Email"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'email')}
        error={errors.email}
        clearError={() => handleErrors('', 'email')}
      />
      <CustomInput
        placeholder="Enter patient phone number"
        label="Patient Contact"
        iconName="phone-outline"
        keyboardType="phone-pad"
        handleSetInput={(text: string) => handleSetInput(text, 'contact')}
        error={errors.contact}
        clearError={() => handleErrors('', 'contact')}
      />
      <CustomInput
        placeholder="Enter patient address"
        label="Patient Address"
        iconName="phone-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'address')}
        error={errors.address}
        clearError={() => handleErrors('', 'address')}
      />
      <CustomDatePicker label="Date of Birth" dob={dob} setDob={setDob} />

      <View style={styles.container}>
        <Text style={customInputStyles.label}>Special Attention:</Text>
        <Icon
          name={specialAttention ? 'star' : 'star-outline'}
          onPress={() => setSpecialAttention(!specialAttention)}
          style={styles.icon}></Icon>
      </View>

      <TouchableOpacity
        disabled={loading}
        style={[formStyles.elementButton, formStyles.lastElementButton]}
        onPress={handleCreate}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={formStyles.textInsideButton}>Add new Patient</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginVertical: 8,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 28,
    color: COLOR.pink2,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
});
export {styles as patientFormStyles};
export default BasicPatientForm;
