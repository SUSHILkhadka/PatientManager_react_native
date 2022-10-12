import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {PHOTO_URL_INTERNET} from '../../constants/common';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {loadPatient} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {deletePatient, editPatient} from '../../axios/backendCallPatient';
import patientCardStyle from '../styles/PatientCard';
import ToastMessage from '../utils/ToastMessage';
import {styles as patientFormStyles} from './PatientForm';

const PatientCard = (props: IPatient) => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFavourite, setLoadingFavourite] = useState(false);
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  const handleEdit = () => {
    dispatch(loadPatient(props));
    navigation.push('edit');
  };

  const createDeleteAlertbox = () =>
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleDelete()},
    ]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deletePatient(props.patientId);
      dispatch(refreshPage(!pageInfo.refreshFlag));
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
  };
  const handleFovouriteChange = async () => {
    setLoadingFavourite(true);
    const body = {
      ...props,
      specialAttention: !props.specialAttention,
    };
    try {
      const response = await editPatient(body, props.patientId);
      dispatch(refreshPage(!pageInfo.refreshFlag));
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoadingFavourite(false);
  };

  return (
    <TouchableOpacity style={[patientCardStyle.row]} onPress={handleEdit}>
      <Image
        style={patientCardStyle.image}
        source={{
          uri: props.photoUrl ? props.photoUrl : PHOTO_URL_INTERNET,
        }}
      />
      <View style={patientCardStyle.row_texts}>
        <Text style={patientCardStyle.row_name}>{props.name}</Text>
        <Text style={patientCardStyle.row_email}>{props.email}</Text>
      </View>
      <TouchableOpacity
        testID="favouriteIcon"
        style={patientCardStyle.favouriteIcon}
        onPress={handleFovouriteChange}
        disabled={loadingFavourite}>
        {loadingFavourite ? (
          <ActivityIndicator />
        ) : (
          <Icon name={props.specialAttention ? 'star' : 'star-outline'} style={patientFormStyles.icon} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        testID="deleteIcon"
        style={patientCardStyle.deleteIcon}
        onPress={createDeleteAlertbox}
        disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={patientCardStyle.deleteIcon_text}>&#9587;</Text>}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PatientCard;
