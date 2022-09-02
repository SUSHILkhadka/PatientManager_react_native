import {AxiosError} from 'axios';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {IAllergy} from '../../redux_toolkit/Interfaces/IAllergy';
import {deleteAllergy} from '../../services/backendCallAllergy';
import allergyCardStyles from '../styles/AllergyCard';
import ToastMessage from '../utils/ToastMessage';
type PropType = {
  allergyObj: IAllergy;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};
const AllergyCard = ({allergyObj, setRefresh}: PropType) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteAllergy = async () => {
    setLoading(true);
    try {
      const response = await deleteAllergy(allergyObj.id);
      setRefresh(prevState => !prevState);
    } catch (e: AxiosError | any) {
      ToastMessage(e.response.data.message, true);
    }
    setLoading(false);
  };
  return (
    <View style={allergyCardStyles.cardContainer}>
      <Text style={allergyCardStyles.text}>{allergyObj.name}</Text>
      <TouchableOpacity
        style={allergyCardStyles.deleteIcon}
        onPress={handleDeleteAllergy}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={allergyCardStyles.icon}>&#9587;</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AllergyCard;
