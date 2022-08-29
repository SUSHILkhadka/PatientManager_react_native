import {ActivityIndicator, ScrollView, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux_toolkit/stores/store';
import React, {useState} from 'react';
import {AxiosError} from 'axios';
import ToastMessage from '../utils/ToastMessage';
import {changePage} from '../../redux_toolkit/slices/pageSlice';
import {editPatient} from '../../services/backendCallPatient';
import AllergyTable from '../allergy/AllergyTable';
import formStyles from '../styles/Form';
import CustomDatePicker from '../utils/CustomDatePicker';
import ImageUploaderAndPreviewer from '../utils/ImageUploaderAndPreviewer';
import {uploadFile} from '../../services/uploadFile';

const EditPatientForm = () => {
  const patientInfo = useSelector((state: RootState) => state.patient);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(patientInfo.name);
  const [email, setEmail] = useState<string>(patientInfo.email);
  const [contact, setContact] = useState<string>(patientInfo.contact);
  const [dob, setDob] = useState<Date>(new Date(patientInfo.dob));
  const [address, setAddress] = useState<string>(patientInfo.address);
  const [specialAttention, setSpecialAttention] = useState<boolean>(
    patientInfo.specialAttention,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pickerResponse, setPickerResponse] = useState<any>();

  const handleCreate = async () => {
    setLoading(true);
    const body = {
      name: name,
      email: email,
      contact: contact,
      dob: dob,
      address: address,
      specialAttention: specialAttention,
      photoUrl: pickerResponse
        ? await uploadFile(pickerResponse)
        : patientInfo.photoUrl,
    };
    try {
      const response = await editPatient(body, patientInfo.patientId);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
    changePageToListPatient();
  };
  const changePageToListPatient = () => {
    dispatch(changePage(1));
  };

  return (
    <View>
      <ScrollView>
      <View style={formStyles.container}>
        <ImageUploaderAndPreviewer
          pickerResponse={pickerResponse}
          setPickerResponse={setPickerResponse}
          previousUrl={patientInfo.photoUrl}
        />
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
          placeholder="enter patient phone no"
          dataDetectorTypes="phoneNumber"
          keyboardType="phone-pad"
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
          <Switch
            onValueChange={setSpecialAttention}
            value={specialAttention}
          />
        </View>
        <Text style={formStyles.elementTextLabel}>List of allergius are:</Text>
        <AllergyTable patientId={patientInfo.patientId} />
        <TouchableOpacity
          disabled={loading}
          style={formStyles.elementButton}
          onPress={handleCreate}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={formStyles.textInsideButton}>Tap to Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default EditPatientForm;
