type resultType = 'ok' | 'cancel';
type extrasType = {
    [key: string]: number | string | boolean;
};
declare function setResultAndFinish(result: resultType, extras: extrasType): void;
export { setResultAndFinish };
//# sourceMappingURL=ActivityManager.d.ts.map