import React, {useRef, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLOR} from '../styles/constants';
type PropType = {
  placeholder: string;
  label: string;
  iconName: string;
  clearError?: () => void;
  error?: string;
  hide?: boolean;
  keyboardType?: KeyboardTypeOptions;
  handleSetInput: (text: string) => void;
  value?: string;
};
const CustomInput = ({
  placeholder,
  label,
  iconName,
  clearError,
  error,
  hide,
  keyboardType,
  handleSetInput,
  value,
}: PropType) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const ref = useRef<any>(null);
  const onSelection = () => {
    ref.current.focus();
  };

  return (
    <Pressable onPress={onSelection} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, {borderColor: error ? 'red' : isFocused ? COLOR.pink2 : '#4c4c4c'}]}>
        {iconName == 'location' ? (
          <Ionicons style={styles.icon} name={iconName} />
        ) : (
          <Icon style={styles.icon} name={iconName} />
        )}
        <TextInput
          ref={ref}
          value={value}
          style={styles.textinput}
          placeholder={placeholder}
          onFocus={() => {
            // clearError && clearError();
            setIsFocused(true);
          }}
          secureTextEntry={hide ? hidePassword : false}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
          onChangeText={text => {
            clearError && clearError();
            handleSetInput(text);
          }}
        />
        {hide && (
          <Icon
            style={styles.icon}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
      <Text style={styles.errorText}>{error ? error : ''}</Text>
    </Pressable>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  label: {
    color: COLOR.white1,
    fontSize: 20,
    marginVertical: 7,
    marginHorizontal: 15,
  },
  inputContainer: {
    borderWidth: 0.5,
    borderRadius: 20,
    backgroundColor: COLOR.black2,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 18,
    color: COLOR.pink2,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  textinput: {
    fontSize: 14,
    color: COLOR.white2,
    flex: 1,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginVertical: 0,
    marginHorizontal: 15,
    zIndex: 2,
  },
});
export default CustomInput;
