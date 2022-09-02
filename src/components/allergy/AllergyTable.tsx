import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {
  addAllergy,
  getAllAllergiesByPatientId,
} from '../../services/backendCallAllergy';
import {COLOR, primaryButtonColor} from '../styles/constants';
import CustomInput from '../utils/CustomInput';
import ToastMessage from '../utils/ToastMessage';
import AllergyCard from './AllergyCard';

type PropType = {
  patientId: number;
};
const AllergyTable = ({patientId}: PropType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IAllergy[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loadingAddButton, setLoadingAddButton] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    allergyName: '',
  });
  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };
  const [errors, setErrors] = useState({
    allergyName: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };
  const validate = (): boolean => {
    if (!inputs.allergyName) {
      handleErrors('allergy name is required', 'allergyName');
      return false;
    }
    return true;
  };
  useEffect(() => {
    setLoading(true);
    const reader = async () => {
      try {
        const response = await getAllAllergiesByPatientId(patientId);
        setData(response.data);
      } catch (e: AxiosError | any) {
        ToastMessage(e.response.data.message);
        setData([]);
      }
      setLoading(false);
    };
    reader();
  }, [refresh]);

  const handleAddAllergy = async () => {
    if (validate()) {
      setLoadingAddButton(true);
      if (!inputs.allergyName) {
        ToastMessage('allergyName cannot be empty', true);
        setLoadingAddButton(false);
        return 0;
      }
      const body = {
        name: inputs.allergyName,
        patientId: patientId,
      };
      try {
        const response = await addAllergy(body);
        ToastMessage(response.message);
        handleSetInput('', 'allergyName');
        setRefresh(!refresh);
      } catch (e: AxiosError | any) {
        console.log(e);
        ToastMessage(e.response.data.message, true);
      }
      setLoadingAddButton(false);
    }
  };

  return (
    <View style={allergyStyles.wholeContainer}>
      <View>
        <CustomInput
          placeholder="Enter new allergy name"
          label="Allergy"
          iconName="virus-outline"
          keyboardType="default"
          handleSetInput={(text: string) => handleSetInput(text, 'allergyName')}
          error={errors.allergyName}
          clearError={() => handleErrors('', 'allergyName')}
        />
        <TouchableOpacity
          style={allergyStyles.elementButton}
          disabled={loadingAddButton}
          onPress={handleAddAllergy}>
          {loadingAddButton ? (
            <ActivityIndicator />
          ) : (
            <Text style={allergyStyles.textInsideButton}>Add allergy</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={allergyStyles.listContainer}>
        {data.map((element: IAllergy) => (
          <AllergyCard
            allergyObj={element}
            setRefresh={setRefresh}
            key={element.id}
          />
        ))}
      </View>
    </View>
  );
};

export const allergyStyles = StyleSheet.create({
  wholeContainer: {
    backgroundColor: COLOR.black2,
    borderWidth: 0.4,
    margin: 5,
    borderRadius: 10,
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  elementButton: {
    display: 'flex',
    width: '25%',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    borderColor: COLOR.white1,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: COLOR.pink2,
    alignSelf: 'center',
  },
  textInsideButton: {
    fontSize: 10,
    textAlign: 'center',
  },
});
export default AllergyTable;
