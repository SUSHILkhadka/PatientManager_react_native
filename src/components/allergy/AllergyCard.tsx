import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {deleteAllergy, updateAllergy} from '../../services/backendCallAllergy';
import ToastMessage from '../utils/ToastMessage';

const AllergyCard = (allergyObj: IAllergy) => {
  const [allergyName, setAllergyName] = useState<string>(allergyObj.name);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditAllergy = async () => {
    setLoading(true);
    const body = {...allergyObj, name: allergyName};
    try {
      const response = await updateAllergy(body);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
  };

  const handleDeleteAllergy = async () => {
    setLoading(true);
    try {
      const response = await deleteAllergy(allergyObj.id);
      ToastMessage(response.message);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
    }
    setLoading(false);
  };
  return (
    <View style={styles.addContainer}>
      <TextInput onChangeText={setAllergyName} value={allergyName} />
      <Button
        disabled={loading}
        onPress={handleEditAllergy}
        title="Edit"
      />
      <Button
        disabled={loading}
        onPress={handleDeleteAllergy}
        title="Delete"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addContainer: {
    margin:10,
    padding: 5,
    display:"flex",
    flexDirection:"row",
    justifyContent: 'space-evenly',
    borderColor:"red",
    borderWidth: 5,
  },
  addContainerElements:{
    margin:3,
    padding:2,
  }
});
export default AllergyCard;
