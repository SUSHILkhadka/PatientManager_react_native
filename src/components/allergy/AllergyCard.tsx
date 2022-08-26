import {AxiosError} from 'axios';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {deleteAllergy, updateAllergy} from '../../services/backendCallAllergy';
import ToastMessage from '../utils/ToastMessage';
import Icon from 'react-native-vector-icons/FontAwesome';
type PropType = {
  allergyObj: IAllergy;
  refresh: boolean;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const AllergyCard = ({allergyObj, refresh, setRefresh}: PropType) => {
  const [allergyName, setAllergyName] = useState<string>(allergyObj.name);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditAllergy = async () => {
    setLoading(true);
    const body = {...allergyObj, name: allergyName};
    try {
      const response = await updateAllergy(body);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoading(false);
  };

  const handleDeleteAllergy = async () => {
    setLoading(true);
    try {
      const response = await deleteAllergy(allergyObj.id);
      ToastMessage(response.message);
      setRefresh(!refresh);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoading(false);
  };
  return (
    <View style={styles.cardContainer}>
      <TextInput
        style={styles.editTextInput}
        onChangeText={setAllergyName}
        value={allergyName}
      />
    <TouchableOpacity
      style={styles.saveIcon}
      onPress={handleEditAllergy}
        disabled={loading}
        >
          <Text style={styles.icon}>	&#10004;</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.deleteIcon}
      onPress={handleDeleteAllergy}
        disabled={loading}
        >
          <Text style={styles.icon}>&#9587;</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editTextInput: {
    margin: 10,
    padding: 5,
    width: ' 70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
  },
  cardContainer: {
    position: 'relative',
  },
  saveIcon: {
    backgroundColor:"green",
    width: '10%',
    position: 'absolute',
    right: 60,
    top: 20,
    borderRadius:10,
    zIndex: 10,
  },
  deleteIcon: {
    backgroundColor:"red",
    width: '10%',
    position: 'absolute',
    right: 5,
    top: 20,
    borderRadius:10,
    zIndex: 10,
  },

  icon:{
    textAlign:"center"
  }
});
export default AllergyCard;
