@objc(Bridge)
class Bridge: NSObject {
    
    @objc(isPackageInstalled:withResolver:withRejecter:)
    func isPackageInstalled(packageName: String, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        if let url = URL(string: packageName), UIApplication.shared.canOpenURL(url) {
          resolve(true)
        } else {
          resolve(false)
        }
    }
    
    @objc(returnAuthCode:state:redirectUri:resolver:rejecter:)
    func returnAuthCode(code: String, state: String, redirectUri: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {        
       if let redirectURL = URL(string: redirectUri) {
           var components = URLComponents(url: redirectURL, resolvingAgainstBaseURL: false)
           
           let paramAuthCode = URLQueryItem(name: "code", value: code)
           let paramState = URLQueryItem(name: "state", value: state)
           components?.queryItems = [paramAuthCode, paramState]
           
           if let resultURL = components?.url {
               UIApplication.shared.open(resultURL, options: [UIApplication.OpenExternalURLOptionsKey.universalLinksOnly: true], completionHandler: nil)
           }
       } else {
           let error = NSError(domain: "googleHome", code: 0, userInfo: [NSLocalizedDescriptionKey: "redirectUri is invalid"])
           reject("0", "redirectUri is nil", error)
       }
    }
    
    @objc(returnError:error:errorDescription:resolver:rejecter:)
    func returnError(redirectUri: String, error: String, errorDescription: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        if let redirectURL = URL(string: redirectUri) {
            var components = URLComponents(url: redirectURL, resolvingAgainstBaseURL: false)
            
            let paramError = URLQueryItem(name: "error", value: error)
            let paramDescription = URLQueryItem(name: "error_description", value: errorDescription)
            components?.queryItems = [paramError, paramDescription]
            
            if let resultURL = components?.url {
                UIApplication.shared.open(resultURL, options: [UIApplication.OpenExternalURLOptionsKey.universalLinksOnly: true], completionHandler: nil)
            }
        } else {
            let error = NSError(domain: "googleHome", code: 0, userInfo: [NSLocalizedDescriptionKey: "redirectUri is invalid"])
            reject("0", "redirectUri is nil", error)
        }
    }
}