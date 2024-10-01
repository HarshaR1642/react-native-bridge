"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setResultAndFinish = setResultAndFinish;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-bridge' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const Bridge = _reactNative.NativeModules.Bridge ? _reactNative.NativeModules.Bridge : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
function setResultAndFinish(result, extras) {
  if (_reactNative.Platform.OS === 'android') {
    Bridge.setResultAndFinish(result, extras);
  }
}
//# sourceMappingURL=ActivityManager.js.map