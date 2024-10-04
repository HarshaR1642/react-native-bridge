#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Bridge, NSObject)

RCT_EXTERN_METHOD(isPackageInstalled:(NSString *)packageName withResolver:(RCTPromiseResolveBlock)resolve withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(returnAuthCode:(NSString *)code
                state:(NSString *)state
                redirectUri:(NSString *)redirectUri
                resolver:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(returnError:(NSString *)redirectUri
                error:(NSString *)error
                errorDescription:(NSString *)errorDescription
                resolver:(RCTPromiseResolveBlock)resolve
                rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
