import React, {useRef, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDateFromString, getFormattedDateFromDateObject} from '../../utils/date.utils';
import {COLOR} from '../styles/constants';
import {styles as customInputStyles} from './CustomInput';
type Prop = {
  label: string;
  name: string;
  value: string;
  handleSetInput: (text: string, label: string) => void;

  clearError?: () => void;
  error?: string;
};
const CustomDatePicker = ({label, value, name, handleSetInput, clearError, error}: Prop) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    clearError && clearError();
    handleSetInput(getFormattedDateFromDateObject(date), name);
    hideDatePicker();
  };
  const ref = useRef<any>(null);

  return (
    <Pressable onPress={() => ref.current.focus()} style={customInputStyles.container}>
      <Text style={customInputStyles.label}>{label}</Text>
      <View style={[customInputStyles.inputContainer, {borderColor: isFocused ? COLOR.pink2 : '#4c4c4c'}]}>
        <Icon style={customInputStyles.icon} name="calendar" />
        <TextInput
          ref={ref}
          style={customInputStyles.textinput}
          onChangeText={text => {
            clearError && clearError();
            handleSetInput(text, name);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
          // onEndEditing={e => {
          //   const value = e.nativeEvent.text;
          //   const date = new Date(value);
          //   const dateinProperFormat = date.toLocaleDateString('fr-CA');

          //   if (dateinProperFormat != 'Invalid Date') {
          //     setDob(new Date(dateinProperFormat));
          //     setTempInputDate(dateinProperFormat);
          //   } else {
          //     setTempInputDate(dob.toLocaleDateString('fr-CA'));
          //   }
          // }}
          onBlur={text => {
            setIsFocused(false);
          }}
          value={value}
        />
        <Ionicons onPress={showDatePicker} style={[customInputStyles.icon, {fontSize: 28}]} name="calendar" />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={getDateFromString(value)}
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
