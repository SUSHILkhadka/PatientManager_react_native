import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {editPatient} from '../../services/backendCallPatient';
import AllergyTable from '../allergy/AllergyTable';
import formStyles from '../styles/Form';
import CustomDatePicker from '../utils/CustomDatePicker';
import ImageUploaderAndPreviewer from '../utils/ImageUploaderAndPreviewer';
import {uploadFile} from '../../services/uploadFile';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../utils/CustomInput';
import {patientFormStyles} from './BasicPatientForm';
import {styles as customInputStyles} from '../utils/CustomInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Validator from '../../validations/Validator';
import patientSchema from '../../validations/patientSchema';

const EditPatientForm = () => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const pageInfo = useSelector((state: RootState) => state.page);
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();
  const [dob, setDob] = useState<Date>(new Date(patientInfo.dob));
  const [specialAttention, setSpecialAttention] = useState<boolean>(
    patientInfo.specialAttention,
  );
  const [inputs, setInputs] = useState({
    name: patientInfo.name,
    email: patientInfo.email,
    contact: patientInfo.contact,
    address: patientInfo.address,
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
  const [pickerResponse, setPickerResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = async () => {
    if (Validator(inputs, patientSchema, handleErrors)) {
      setLoading(true);
      const body = {
        name: inputs.name,
        email: inputs.email,
        contact: inputs.contact,
        dob: dob,
        address: inputs.address,
        specialAttention: specialAttention,
        photoUrl: pickerResponse
          ? await uploadFile(pickerResponse)
          : patientInfo.photoUrl,
      };
      try {
        const response = await editPatient(body, patientInfo.patientId);
        changePageToListPatient();
        ToastMessage(response.message);
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message);
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
        previousUrl={patientInfo.photoUrl}
        pickerResponse={pickerResponse}
        setPickerResponse={setPickerResponse}
      />
      <CustomInput
        defaultValue={inputs.name}
        placeholder="Enter patient name"
        label="Patient Name"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'name')}
        error={errors.name}
        clearError={() => handleErrors('', 'name')}
      />
      <CustomInput
        defaultValue={inputs.email}
        placeholder="Enter patient email address"
        label="Patient Email"
        iconName="email-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'email')}
        error={errors.email}
        clearError={() => handleErrors('', 'email')}
      />
      <CustomInput
        defaultValue={inputs.contact}
        placeholder="Enter patient phone number"
        label="Patient Contact"
        iconName="phone-outline"
        keyboardType="phone-pad"
        handleSetInput={(text: string) => handleSetInput(text, 'contact')}
        error={errors.contact}
        clearError={() => handleErrors('', 'contact')}
      />
      <CustomInput
        defaultValue={inputs.address}
        placeholder="Enter patient address"
        label="Patient Address"
        iconName="phone-outline"
        keyboardType="default"
        handleSetInput={(text: string) => handleSetInput(text, 'address')}
        error={errors.address}
        clearError={() => handleErrors('', 'address')}
      />
      <CustomDatePicker label="Date of Birth" dob={dob} setDob={setDob} />

      <View style={patientFormStyles.container}>
        <Text style={customInputStyles.label}>Special Attention:</Text>
        <Icon
          name={specialAttention ? 'star' : 'star-outline'}
          onPress={() => setSpecialAttention(!specialAttention)}
          style={patientFormStyles.icon}></Icon>
      </View>
      <AllergyTable patientId={patientInfo.patientId} />
      <TouchableOpacity
        disabled={loading}
        style={[formStyles.elementButton, formStyles.lastElementButton]}
        onPress={handleEdit}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={formStyles.textInsideButton}>Tap to Save Changes</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditPatientForm;
