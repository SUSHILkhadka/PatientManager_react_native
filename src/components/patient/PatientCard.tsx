import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {changePage, refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {load} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {deletePatient} from '../../services/backendCallPatient';
import styleImage from '../styles/Image';
import patientCardStyle from '../styles/PatientCard';
import ToastMessage from '../utils/ToastMessage';

const PatientCard = (props: IPatient) => {
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  const handleEdit = () => {
    dispatch(load(props));
    dispatch(changePage(3));
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
    setDeleteButtonLoading(true);
    try {
      const response = await deletePatient(props.patientId);
      dispatch(refreshPage(!pageInfo.refreshFlag));
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setDeleteButtonLoading(false);
  };

  return (
    <View style={patientCardStyle.row}>
      <Image
        style={patientCardStyle.image}
        source={{
          uri: props.photoUrl
            ? props.photoUrl
            : 'https://api.minimalavatars.com/avatar/random/png',
        }}
      />
      <Text>{props.name}</Text>
      <Text>{props.email}</Text>
      <Text>{props.address}</Text>
      <Text>{props.specialAttention.toString()}</Text>
      <Text onPress={handleEdit}>Edit</Text>
      <Button
        title="Delete"
        disabled={deleteButtonLoading}
        onPress={createDeleteAlertbox}></Button>
    </View>
  );
};

export default PatientCard;
