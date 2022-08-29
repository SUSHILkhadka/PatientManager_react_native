import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {
  addAllergy,
  getAllAllergiesByPatientId,
} from '../../services/backendCallAllergy';
import { primaryButtonColor } from '../styles/constants';
import formStyles from '../styles/Form';
import ToastMessage from '../utils/ToastMessage';
import AllergyCard from './AllergyCard';


type PropType = {
  patientId: number;
};
const AllergyTable = ({patientId}: PropType) => {
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
        console.log('reading allergies', response.data);
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
      setAllergyName('')
      setRefresh(!refresh);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoadingAddButton(false);
  };

  return (
    <View>
      <View style={allergyStyles.addContainer}>
        <TextInput style={formStyles.elementTextInput} onChangeText={setAllergyName} value={allergyName} />
        <TouchableOpacity style={allergyStyles.elementButton}
          disabled={loadingAddButton}
          onPress={handleAddAllergy}>
          <Text style={allergyStyles.textInsideButton}>Add allergy</Text>
        </TouchableOpacity>
      </View>

      <View style={allergyStyles.listContainer}>
        {data.map((element: IAllergy) => (
          <AllergyCard
            allergyObj={element}
            refresh={refresh}
            setRefresh={setRefresh}
            key={element.id}
          />
        ))}
      </View>
    </View>
  );
};

export const allergyStyles = StyleSheet.create({
  addContainer: {},
  listContainer: {},
  elementButton: {
    display: 'flex',
    width: '20%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderColor: primaryButtonColor,
    borderWidth: 3,
    borderRadius: 10,
    fontSize: 20,
    backgroundColor: primaryButtonColor,
    alignSelf:"center",
  },
  textInsideButton:{
    fontSize: 10,
    textAlign: "center",
  },
});
export default AllergyTable;
