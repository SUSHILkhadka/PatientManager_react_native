import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 *
 * @param response whole login response obj
 * stores response in AsyncStorage as string
 */

export async function saveLoginResponse(response: any) {
  try {
    await AsyncStorage.setItem('loginResponse', response);
  } catch {}
}

/**
 *
 * @returns login response as string
 */
export async function getLoginResponse(): Promise<any> {
  const obj = await AsyncStorage.getItem('loginResponse');
  return obj ? obj : '';
}

/**
 *
 * @returns login status from local storage as boolean value
 */
export async function getLogStatus(): Promise<boolean> {
  const logStatus = await AsyncStorage.getItem('LogStatus');
  return logStatus ? Boolean(logStatus) : false;
}

/**
 *
 * @param loggedIn Log in response after successful login to server
 * saves boolean as string in local storage
 */
export async function setLogStatus(loggedIn: boolean): Promise<void> {
  if (loggedIn) {
    await AsyncStorage.setItem('LogStatus', 'true');
  } else {
    await AsyncStorage.setItem('LogStatus', '');
  }
}

//cookies
/**
 *
 * @param response accesstoken itself
 * saves accesstoken in cookie
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
 * saves in cookie
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
 * @returns refreshtoken as string from cookie
 */
export async function getRefreshToken(): Promise<string> {
  const obj = await AsyncStorage.getItem('refreshToken');
  return obj ? obj : '';
}

/**
 *
 * @returns expiry time of refreshtoken as number from cookie
 */
export async function getExpiresAtRefreshToken(): Promise<number> {
  const obj = await AsyncStorage.getItem('expiresAtRefreshToken');
  return obj ? +obj : -1;
}
