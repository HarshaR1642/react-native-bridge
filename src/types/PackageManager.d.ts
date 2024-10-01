declare function isPackageInstalled(packageName: string): Promise<boolean>;
declare function getPackageFingerprint(
  packageName: string
): Promise<string | null>;
export { isPackageInstalled, getPackageFingerprint };
