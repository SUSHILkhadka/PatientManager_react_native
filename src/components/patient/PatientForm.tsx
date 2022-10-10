import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {sentArrayOfAllergyToBackend} from '../../services/backendCallAllergy';
import {addPatient, editPatient} from '../../services/backendCallPatient';
import {uploadFile} from '../../services/uploadFile';
import patientSchema from '../../validations/schemas/patientSchema';
import Validator from '../../validations/Validator';
import AllergySection from '../allergy/AllergySection';
import {COLOR} from '../styles/constants';
import formStyles from '../styles/Form';
import CustomDatePicker from '../utils/CustomDatePicker';
import CustomInput, {styles as customInputStyles} from '../utils/CustomInput';
import ImageUploaderAndPreviewer from '../utils/ImageUploaderAndPreviewer';
import ToastMessage from '../utils/ToastMessage';

type PropType = {
  initialValue: IPatient;
};
const PatientForm = ({initialValue}: PropType) => {
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();
  const pageInfo = useSelector((state: RootState) => state.page);
  const allergyArrayInfo = useSelector((state: RootState) => state.allergy);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const [inputs, setInputs] = useState(initialValue);
  const [dob, setDob] = useState<Date>(new Date(initialValue.dob ? initialValue.dob : Date.now()));
  const [specialAttention, setSpecialAttention] = useState<boolean>(initialValue.specialAttention);
  const [pickerResponse, setPickerResponse] = useState<any>();
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

  const handleEdit = async () => {
    const body = {
      name: inputs.name,
      email: inputs.email,
      contact: inputs.contact,
      dob: dob,
      address: inputs.address,
      specialAttention: specialAttention,
      photoUrl: pickerResponse ? await uploadFile(pickerResponse) : initialValue.photoUrl,
    };
    if (Validator(body, patientSchema, handleErrors)) {
      setLoading(true);

      try {
        if (initialValue.name == '') {
          const response = await addPatient(body);
          console.log(response.data);
          const responseAfterAllergy = await sentArrayOfAllergyToBackend(allergyArrayInfo, response.data.patientId);
          ToastMessage('Patient added Successfully');
        } else {
          const response = await editPatient(body, initialValue.patientId);
          const responseAfterAllergy = await sentArrayOfAllergyToBackend(allergyArrayInfo, initialValue.patientId);
          ToastMessage('Patient edited Successfully');
        }
        changePageToListPatient();
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message);
      }
      setLoading(false);
    }
  };

  const changePageToListPatient = () => {
    dispatch(refreshPage(!pageInfo.refreshFlag));
    navigation.push('list');
  };

  return (
    <View>
      <ImageUploaderAndPreviewer
        previousUrl={initialValue.photoUrl}
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

      <View style={styles.container}>
        <Text style={customInputStyles.label}>Special Attention:</Text>
        <Icon
          name={specialAttention ? 'star' : 'star-outline'}
          onPress={() => setSpecialAttention(!specialAttention)}
          style={styles.icon}></Icon>
      </View>
      <AllergySection />
      <TouchableOpacity
        disabled={loading}
        style={[formStyles.elementButton, formStyles.lastElementButton]}
        onPress={handleEdit}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={formStyles.textInsideButton}>{initialValue.name != '' ? 'Tap to Save Changes' : 'add'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
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

export default PatientForm;
