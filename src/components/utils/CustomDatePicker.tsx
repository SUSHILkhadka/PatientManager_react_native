import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {TextInput, View, Text, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
    setTempInputDate(date.toLocaleDateString('fr-CA'));
    hideDatePicker();
  };
  const ref = useRef<any>(null);
  const [tempInputDate, setTempInputDate] = useState(dob.toLocaleDateString('fr-CA'));

  return (
    <Pressable onPress={() => ref.current.focus()} style={customInputStyles.container}>
      <Text style={customInputStyles.label}>{label}</Text>
      <View style={[customInputStyles.inputContainer, {borderColor: isFocused ? COLOR.pink2 : '#4c4c4c'}]}>
        <Icon style={customInputStyles.icon} name="calendar" />
        <TextInput
          ref={ref}
          style={customInputStyles.textinput}
          onChangeText={text => {
            setTempInputDate(text);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          onEndEditing={e => {
            const value = e.nativeEvent.text;
            const date = new Date(value);
            const dateinProperFormat = date.toLocaleDateString('fr-CA');

            if (dateinProperFormat != 'Invalid Date') {
              setDob(new Date(dateinProperFormat));
              setTempInputDate(dateinProperFormat);
            } else {
              setTempInputDate(dob.toLocaleDateString('fr-CA'));
            }
          }}
          onBlur={text => {
            setIsFocused(false);
          }}
          value={tempInputDate}
        />
        <Ionicons onPress={showDatePicker} style={[customInputStyles.icon, {fontSize: 28}]} name="calendar" />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={dob}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          textColor={COLOR.pink1}
          accentColor={COLOR.pink1}
        />
      </View>
      <Text style={customInputStyles.errorText}>{error ? error : ''}</Text>
    </Pressable>
  );
};

export default CustomDatePicker;
