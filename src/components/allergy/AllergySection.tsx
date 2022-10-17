import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {addNewAllergy} from '../../redux_toolkit/slices/allergySlice';
import {RootState} from '../../redux_toolkit/stores/store';
import allerygySchema from '../../validations/schemas/allergySchema';
import Validator from '../../validations/Validator';
import {COLOR} from '../styles/constants';
import CustomInput from '../utils/CustomInput';
import AllergyCard from './AllergyCard';

const AllergySection = () => {
  const allergyArrayInfo = useSelector((state: RootState) => state.allergy);
  const dispatch = useDispatch();
  const initialValue = {
    allergyName: '',
  };
  const [inputs, setInputs] = useState(initialValue);
  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };
  const [errors, setErrors] = useState({
    allergyName: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };

  const handleAddAllergy = async () => {
    if (Validator(inputs, allerygySchema, handleErrors)) {
      dispatch(addNewAllergy(inputs.allergyName.trim()));
      setInputs({
        allergyName: '',
      });
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
          value={inputs.allergyName}
          handleSetInput={(text: string) => handleSetInput(text, 'allergyName')}
          error={errors.allergyName}
          clearError={() => handleErrors('', 'allergyName')}
        />
        <TouchableOpacity style={allergyStyles.elementButton} onPress={handleAddAllergy}>
          <Text style={allergyStyles.textInsideButton}>Add allergy</Text>
        </TouchableOpacity>
      </View>

      <View style={allergyStyles.listContainer}>
        <>
          {allergyArrayInfo.map((element: IAllergy, index: number) => {
            if (element.status != 'deleted') return <AllergyCard key={element.id} index={index} name={element.name} />;
          })}
        </>
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
export default AllergySection;
