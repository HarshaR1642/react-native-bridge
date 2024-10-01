"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPackageFingerprint = getPackageFingerprint;
exports.isPackageInstalled = isPackageInstalled;
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
async function isPackageInstalled(packageName) {
  return await Bridge.isPackageInstalled(packageName);
}
async function getPackageFingerprint(packageName) {
  if (_reactNative.Platform.OS === 'android') {
    return await Bridge.getPackageFingerprint(packageName);
  }
  return null;
}
//# sourceMappingURL=PackageManager.js.map