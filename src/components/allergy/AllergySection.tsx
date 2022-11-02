import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {addNewAllergy} from '../../redux_toolkit/slices/allergySlice';
import {RootState} from '../../redux_toolkit/stores/store';
import allerygySchema from '../../validations/schemas/allergySchema';
import Validator from '../../validations/Validator';
import CustomInput from '../Customs/CustomInput';
import {COLOR} from '../styles/constants';
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
      handleSetInput('', 'allergyName');
      setModalVisible(false);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={allergyStyles.wholeContainer}>
      <View style={allergyStyles.listContainer}>
        <>
          {allergyArrayInfo.map((element: IAllergy, index: number) => {
            if (element.status != 'deleted') return <AllergyCard key={element.id} index={index} name={element.name} />;
          })}
        </>
      </View>

      <View>
        <Modal isVisible={modalVisible} useNativeDriver={true} onBackdropPress={() => setModalVisible(false)}>
          <View style={allergyStyles.modalContent}>
            <View style={allergyStyles.content}>
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
              <View style={allergyStyles.footer}>
                <TouchableOpacity
                  style={allergyStyles.elementButton}
                  onPress={() => {
                    setModalVisible(false);
                    handleSetInput('', 'allergyName');
                  }}>
                  <Text style={allergyStyles.textInsideButton}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={allergyStyles.elementButton} onPress={handleAddAllergy}>
                  <Text style={allergyStyles.textInsideButton}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={allergyStyles.elementButton} onPress={() => setModalVisible(true)}>
          <Text style={allergyStyles.textInsideButton}>Add new allergy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
export const allergyStyles = StyleSheet.create({
  modalContent: {
    display: 'flex',
    justifyContent: 'center',
    height: windowHeight,
  },
  content: {
    opacity: 2,
    borderRadius: 20,
    backgroundColor: COLOR.black1,
    borderColor: COLOR.pink2,
    borderWidth: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
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
