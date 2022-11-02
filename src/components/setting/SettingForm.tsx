import {useNavigation} from '@react-navigation/native';
import {AxiosError} from 'axios';
import React, {useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteLoginResponse, saveLoginResponse} from '../../async_storage/asyncStorage';
import {editUser, login} from '../../axios/backendCallUser';
import {typeOfUseNavigationHook} from '../../navigator/Navigator';
import {IDataAtToken} from '../../redux_toolkit/Interfaces/IDataAtToken';
import {loadAuthInfoWithLoginInfo, logoutAuthInfo} from '../../redux_toolkit/slices/authSlice';
import {RootState} from '../../redux_toolkit/stores/store';
import {getDataFromJWTToken} from '../../utils/jwt.utils';
import editUserSchema, {editNameSchema} from '../../validations/schemas/editUserSchema';
import Validator from '../../validations/Validator';
import formStyles from '../styles/Form';
import CustomInput from '../Customs/CustomInput';
import ToastMessage, {showDefaultErrorMessage} from '../../utils/ToastMessage.utils';

const SettingForm = () => {
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation: typeOfUseNavigationHook['navigation'] = useNavigation();

  const [loading, setLoading] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<boolean>(true);
  const [inputs, setInputs] = useState({
    name: authInfo.username,
    password: '',
    confirmPassword: '',
    oldPassword: '',
  });
  const handleSetInput = (text: string, label: string) => {
    setInputs(prevState => ({...prevState, [label]: text}));
  };
  const [errors, setErrors] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
  });
  const handleErrors = (error: string, label: string) => {
    setErrors(prevState => ({...prevState, [label]: error}));
  };

  const handleEdit = async () => {
    const body = {
      previousName: authInfo.username,
      name: changeName ? inputs.name.trim() : authInfo.username,
      oldPassword: inputs.oldPassword,
      password: changeName ? inputs.oldPassword : inputs.password,
      confirmPassword: changeName ? inputs.oldPassword : inputs.confirmPassword,
    };
    if (Validator(body, changeName ? editNameSchema : editUserSchema, handleErrors)) {
      setLoading(true);

      try {
        const response = await editUser(body);
        if (!changeName) {
          dispatch(logoutAuthInfo());
          await deleteLoginResponse();
          ToastMessage('Password changed successfully');
        } else {
          //relogin
          const body = {
            email: authInfo.email,
            password: inputs.oldPassword,
          };
          const response = await login(body);
          const authData = getDataFromJWTToken(response.refreshToken) as IDataAtToken;
          dispatch(loadAuthInfoWithLoginInfo(authData));
          await saveLoginResponse(response, authData.expiryDateForRefreshToken);
          ToastMessage('Name changed successfully');
        }
      } catch (e: AxiosError | any) {
        showDefaultErrorMessage(e);
      }
      setLoading(false);
    }
  };

  return (
    <View>
      {changeName && (
        <CustomInput
          placeholder="Enter your name"
          label="Name"
          iconName="email-outline"
          keyboardType="default"
          value={inputs.name}
          handleSetInput={(text: string) => handleSetInput(text, 'name')}
          error={errors.name}
          clearError={() => handleErrors('', 'name')}
        />
      )}

      <CustomInput
        placeholder="Enter old password"
        label="Old Password"
        iconName="lock-outline"
        hide={true}
        handleSetInput={(text: string) => handleSetInput(text, 'oldPassword')}
        error={errors.oldPassword}
        clearError={() => handleErrors('', 'oldPassword')}
      />

      {!changeName && (
        <CustomInput
          placeholder="Enter your password"
          label="Password"
          iconName="lock-outline"
          hide={true}
          handleSetInput={(text: string) => handleSetInput(text, 'password')}
          error={errors.password}
          clearError={() => handleErrors('', 'password')}
        />
      )}
      {!changeName && (
        <CustomInput
          placeholder="Enter your confirm password"
          label="Confirm Password"
          iconName="lock-outline"
          hide={true}
          handleSetInput={(text: string) => handleSetInput(text, 'confirmPassword')}
          error={errors.confirmPassword}
          clearError={() => handleErrors('', 'confirmPassword')}
        />
      )}
      <TouchableOpacity style={formStyles.elementButton} onPress={handleEdit}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={formStyles.textInsideButton}>{changeName ? 'Save name' : 'Save password'}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[formStyles.elementButton, formStyles.lastButton]}
        onPress={() => setChangeName(!changeName)}>
        <Text style={[formStyles.textInsideButton]}>
          {changeName ? 'change password instead' : 'change name instead'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingForm;
