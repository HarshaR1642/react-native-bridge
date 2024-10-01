import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-bridge' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Bridge = NativeModules.Bridge
  ? NativeModules.Bridge
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type resultType = 'ok' | 'cancel';
type extrasType = { [key: string]: number | string | boolean };
function setResultAndFinish(result: resultType, extras: extrasType): void {
  if (Platform.OS === 'android') {
    Bridge.setResultAndFinish(result, extras);
  }
}

function returnAuthCode(
  code: string,
  state: string,
  redirectUri: string
): void {
  if (Platform.OS === 'ios') {
    Bridge.returnAuthCode(code, state, redirectUri);
  }
}

function returnError(
  redirectUri: string,
  error: string,
  errorDescription: string = ''
): void {
  if (Platform.OS === 'ios') {
    Bridge.returnError(redirectUri, error, errorDescription);
  }
}

export { setResultAndFinish, returnAuthCode, returnError };
