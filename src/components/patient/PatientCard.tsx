import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {RefObject, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {changePage, refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {load} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {deletePatient, editPatient} from '../../services/backendCallPatient';
import patientCardStyle from '../styles/PatientCard';
import ToastMessage from '../utils/ToastMessage';
import {patientFormStyles} from './BasicPatientForm';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientCard = (props: IPatient) => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFavourite, setLoadingFavourite] = useState(false);
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  const handleEdit = () => {
    dispatch(load(props));
    navigation.navigate('edit');
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
          uri: props.photoUrl
            ? props.photoUrl
            : 'https://api.minimalavatars.com/avatar/random/png',
        }}
      />
      <View style={patientCardStyle.row_texts}>
        <Text style={patientCardStyle.row_name}>{props.name}</Text>
        <Text style={patientCardStyle.row_email}>{props.email}</Text>
      </View>
      <TouchableOpacity
        style={patientCardStyle.favouriteIcon}
        onPress={handleFovouriteChange}
        disabled={loadingFavourite}>
        {loadingFavourite ? (
          <ActivityIndicator />
        ) : (
          <Icon
            name={props.specialAttention ? 'star' : 'star-outline'}
            style={patientFormStyles.icon}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={patientCardStyle.deleteIcon}
        onPress={createDeleteAlertbox}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={patientCardStyle.deleteIcon_text}>&#9587;</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PatientCard;
