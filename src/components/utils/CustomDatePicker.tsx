import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {TextInput, View, Text, Pressable} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLOR} from '../styles/constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles as customInputStyles} from './CustomInput';
type Prop = {
  label: string;
  dob: Date;
  clearError?: () => void;
  error?: string;
  setDob: Dispatch<SetStateAction<Date>>;
};
const CustomDatePicker = ({label, dob, setDob, clearError, error}: Prop) => {
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
  const ref = useRef<any>(null);

  return (
    <Pressable onPress={() => ref.current.focus()} style={customInputStyles.container}>
      <Text style={customInputStyles.label}>{label}</Text>
      <View style={[customInputStyles.inputContainer, {borderColor: isFocused ? COLOR.pink2 : '#4c4c4c'}]}>
        <Icon style={customInputStyles.icon} name="calendar" />
        {/* <TextInput
        
          style={customInputStyles.textinput}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          value={dob.toDateString()}
          onPressIn={showDatePicker}
        /> */}

        <TextInput
          ref={ref}
          style={customInputStyles.textinput}
          onChangeText={text => {
            // setDob(text.toString())
          }}
          onFocus={() => {
            // showDatePicker()
            setIsFocused(true);
          }}
          onBlur={text => {
            console.log(text);
            // console.log(new Date(text));
            // setDob(new Date(text));
            setIsFocused(false);
          }}
          value={dob.toDateString()}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={dob}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <Text style={customInputStyles.errorText}>{error ? error : ''}</Text>
    </Pressable>
  );
};

export default CustomDatePicker;
