import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {deletePatient, editPatient} from '../../axios/backendCallPatient';
import {PHOTO_URL_INTERNET} from '../../constants/common';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IPatient} from '../../redux_toolkit/Interfaces/IPatient';
import {refreshPage} from '../../redux_toolkit/slices/pageSlice';
import {loadPatient} from '../../redux_toolkit/slices/patientSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {COLOR} from '../styles/constants';
import ToastMessage from '../utils/ToastMessage';

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
    <TouchableOpacity style={[style.patientCard]} onPress={handleEdit}>
      <Image
        style={style.imageContainer}
        source={{
          uri: props.photoUrl ? props.photoUrl : PHOTO_URL_INTERNET,
        }}
      />
      <View style={style.detailsContainer}>
        <Text style={style.detailName}>{props.name}</Text>
        <Text style={style.detailEmail}>{props.email}</Text>
        <Text style={style.detailEmail}>{props.contact}</Text>
        <Text style={style.detailEmail}>{props.dob.split('T')[0]}</Text>
        <TouchableOpacity
          testID="favouriteIcon"
          style={style.favourite}
          onPress={handleFovouriteChange}
          disabled={loadingFavourite}>
          {loadingFavourite ? (
            <ActivityIndicator color={COLOR.pink1} size={34} />
          ) : (
            <Icon name={props.specialAttention ? 'star' : 'star-outline'} style={style.icon} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity testID="deleteIcon" style={style.deleteIcon} onPress={createDeleteAlertbox} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={style.deleteIcon_text}>&#9587;</Text>}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  patientCard: {
    position: 'relative',
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    margin: 6,
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: 50,
    borderTopRightRadius: 12,
    backgroundColor: COLOR.black2,
  },
  imageContainer: {
    display: 'flex',
    alignSelf: 'center',
    margin: 8,
    width: '40%',
    height: '80%',

    borderRadius: 500,

    borderColor: 'white',
    borderWidth: 1.5,
    backgroundColor: COLOR.black2,
  },
  detailsContainer: {
    display: 'flex',
    width: '50%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  detailName: {
    fontSize: 24,
  },
  detailEmail: {
    fontSize: 14,
  },
  favourite: {},
  icon: {
    fontSize: 34,
    color: COLOR.pink2,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  deleteIcon: {
    position: 'absolute',

    backgroundColor: COLOR.pink2,
    width: 10,
    borderRadius: 500,
    zIndex: 10,
    marginLeft: '90%',
  },
  deleteIcon_text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PatientCard;
