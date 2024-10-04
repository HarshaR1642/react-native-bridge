type resultType = 'ok' | 'cancel';
type extrasType = {
    [key: string]: number | string | boolean;
};
declare function setResultAndFinish(result: resultType, extras: extrasType): void;
declare function returnAuthCode(code: string, state: string, redirectUri: string): void;
declare function returnError(redirectUri: string, error: string, errorDescription?: string): void;
export { setResultAndFinish, returnAuthCode, returnError };
//# sourceMappingURL=ActivityManager.d.ts.map