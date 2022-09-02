import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param response whole login response obj
 * stores whole response in AsyncStorage as string and also tokens separatly for easy access
 */

export async function saveLoginResponse(response: any) {
  await saveAccessToken(response.accessToken);
  await saveRefreshToken(response.refreshToken, response.expiresAtRefreshToken);
  await AsyncStorage.setItem('loginResponse', JSON.stringify(response));
}

export async function deleteLoginResponse() {
  await saveAccessToken("");
  await saveRefreshToken("");
  await AsyncStorage.setItem('loginResponse', "");
}

/**
 *
 * @returns login response as string
 */
export async function getLoginResponse(): Promise<any> {
  const obj = await AsyncStorage.getItem('loginResponse');
  return obj ? obj : '';
}


//storage
/**
 *
 * @param response accesstoken itself
 * saves accesstoken in storage
 */
export async function saveAccessToken(response: string) {
  await AsyncStorage.setItem('accessToken', response);
}

/**
 *
 * @returns accesstoken as string
 */
export async function getAccessToken(): Promise<string> {
  const obj = await AsyncStorage.getItem('accessToken');
  return obj ? obj : '';
}

/**
 *
 * @param response refreshtoken as string
 * @param date expiry date of refreshtoken as number
 * saves in storage
 */
export async function saveRefreshToken(response: string, date?: number) {
  await AsyncStorage.setItem('refreshToken', response);
  await AsyncStorage.setItem(
    'expiresAtRefreshToken',
    date ? date.toString() : '',
  );
}

/**
 *
 * @returns refreshtoken as string from storage
 */
export async function getRefreshToken(): Promise<string> {
  const obj = await AsyncStorage.getItem('refreshToken');
  return obj ? obj : '';
}

/**
 *
 * @returns expiry time of refreshtoken as number from storage
 */
export async function getExpiresAtRefreshToken(): Promise<number> {
  const obj = await AsyncStorage.getItem('expiresAtRefreshToken');
  return obj ? +obj : -1;
}
