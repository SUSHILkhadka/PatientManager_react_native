import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteAllergy} from '../../redux_toolkit/slices/allergySlice';
import allergyCardStyles from '../styles/AllergyCard';
type PropType = {
  index: number;
  name: string;
};
const AllergyCard = ({index, name}: PropType) => {
  const dispatch = useDispatch();

  const handleDeleteAllergy = () => {
    dispatch(deleteAllergy(index));
  };

  return (
    <View style={allergyCardStyles.cardContainer}>
      <Text style={allergyCardStyles.text}>{name}</Text>
      <TouchableOpacity style={allergyCardStyles.deleteIcon} onPress={handleDeleteAllergy}>
        <Text style={allergyCardStyles.icon}>&#9587;</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllergyCard;
