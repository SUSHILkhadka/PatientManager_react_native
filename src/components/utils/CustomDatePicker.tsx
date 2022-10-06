import React, {Dispatch, SetStateAction, useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLOR} from '../styles/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles as customInputStyles} from './CustomInput';
type Prop = {
  label: string;
  dob: Date;
  setDob: Dispatch<SetStateAction<Date>>;
};
const CustomDatePicker = ({label, dob, setDob}: Prop) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setDob(date);
    hideDatePicker();
  };

  return (
    <View style={customInputStyles.container}>
      <Text style={customInputStyles.label}>{label}</Text>
      <View style={[customInputStyles.inputContainer, {borderColor: isFocused ? COLOR.pink2 : '#4c4c4c'}]}>
        <Icon style={customInputStyles.icon} name="calendar" />
        <TextInput
          style={customInputStyles.textinput}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          value={dob.toDateString()}
          onPressIn={showDatePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={dob}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
};

export default CustomDatePicker;
