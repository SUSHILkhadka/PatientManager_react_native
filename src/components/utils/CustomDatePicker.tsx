import React, {Dispatch, SetStateAction, useState} from 'react';
import {TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import formStyles from '../styles/Form';
type Prop = {
  dob: Date;
  setDob: Dispatch<SetStateAction<Date>>;
};
const CustomDatePicker = ({dob, setDob}: Prop) => {
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
    <View>
      <TextInput
        style={formStyles.elementTextInput}
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
  );
};

export default CustomDatePicker;
