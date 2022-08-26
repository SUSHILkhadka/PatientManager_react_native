import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {changePage, refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {load} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {deletePatient} from '../../services/backendCallPatient';
import ToastMessage from '../utils/ToastMessage';

const PatientCard = (props: IPatient) => {
  const navigation: typeOfUseNavigationHook = useNavigation();
  const patientInfo = useSelector((state: RootState) => state.patient);
  const pageInfo = useSelector((state: RootState) => state.page);
  const dispatch = useDispatch();

  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);

  const handleEdit = () => {
    dispatch(load(props));
    dispatch(changePage(3));
  };
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
    <View style={styles.row}  >
      <Text>{props.patientId}</Text>
      <Text>{props.name}</Text>
      <Text>{props.email}</Text>
      <Text>{props.address}</Text>
      <Text>{props.specialAttention.toString()}</Text>
      <Text onPress={handleEdit}>Edit</Text>
      <Button title='Delete' disabled={deleteButtonLoading}  onPress={handleDelete}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    margin: 5,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    borderWidth: 5,
  },
});
export default PatientCard;
