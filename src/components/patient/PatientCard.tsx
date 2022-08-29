import { useNavigation } from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { typeOfUseNavigationHook } from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {changePage, refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {load} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {deletePatient} from '../../services/backendCallPatient';
import patientCardStyle from '../styles/PatientCard';
import ToastMessage from '../utils/ToastMessage';

const PatientCard = (props: IPatient) => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation:typeOfUseNavigationHook["navigation"]=useNavigation()

  const handleEdit = () => {
    dispatch(load(props));
    dispatch(changePage(3));
    navigation.navigate('edit')
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

  return (
    <TouchableOpacity style={patientCardStyle.row} onPress={handleEdit}>
      <Image
        style={patientCardStyle.image}
        source={{
          uri: props.photoUrl
            ? props.photoUrl
            : 'https://api.minimalavatars.com/avatar/random/png',
        }}
      />
      <Text style={patientCardStyle.row_name}>{props.name}</Text>
      <Text style={patientCardStyle.row_name}>{props.email}</Text>
      <Text style={patientCardStyle.row_name}>{props.address}</Text>
      <Text style={patientCardStyle.row_name}>{props.specialAttention.toString()}</Text>
      <TouchableOpacity
        style={patientCardStyle.deleteIcon}
        onPress={createDeleteAlertbox}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={patientCardStyle.icon}>&#9587;</Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PatientCard;
