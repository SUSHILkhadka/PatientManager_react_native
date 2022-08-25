import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {
  addAllergy,
  getAllAllergiesByPatientId,
} from '../../services/backendCallAllergy';
import ToastMessage from '../utils/ToastMessage';
import AllergyCard from './AllergyCard';

type PropType = {
    patientId: number;
};
const ListAllergy = ({patientId}: PropType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IAllergy[]>([]);
  const [allergyName, setAllergyName] = useState<string>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loadingAddButton, setLoadingAddButton] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const reader = async () => {
      try {
        const response = await getAllAllergiesByPatientId(patientId);
        setData(response.data);
        console.log('reading allergies',response.data)
        ToastMessage(response.message);
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message);
        setData([]);
      }
      setLoading(false);
    };
    reader();
  }, [refresh]);

  const handleAddAllergy = async () => {
    setLoadingAddButton(true);
    const body = {
      name: allergyName,
      patientId: patientId,
    };
    try {
      const response = await addAllergy(body);
      ToastMessage(response.message);
      setRefresh(!refresh);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message);
      setData([]);
    }
    setLoadingAddButton(false);
  };

  return (
    <View>
      <View style={styles.addContainer}>
        <TextInput onChangeText={setAllergyName} value={allergyName} />
        <Button
          disabled={loadingAddButton}
          onPress={handleAddAllergy}
          title=" Add allergy"
        />
      </View>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <View style={styles.listContainer}>
          {data.map((element: IAllergy) => (
            <AllergyCard {...element} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  addContainer: {},
  listContainer: {},
});
export default ListAllergy;
