"use strict";

import { NativeModules, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-bridge' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Bridge = NativeModules.Bridge ? NativeModules.Bridge : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function setResultAndFinish(result, extras) {
  if (Platform.OS === 'android') {
    Bridge.setResultAndFinish(result, extras);
  }
}
function returnAuthCode(code, state, redirectUri) {
  if (Platform.OS === 'ios') {
    Bridge.returnAuthCode(code, state, redirectUri);
  }
}
function returnError(redirectUri, error, errorDescription = '') {
  if (Platform.OS === 'ios') {
    Bridge.returnError(redirectUri, error, errorDescription);
  }
}
export { setResultAndFinish, returnAuthCode, returnError };
//# sourceMappingURL=ActivityManager.js.map