# React Native AEP Target Extension

## Notice of deprecation

Since *April 25, 2023*, [Apple has required](https://developer.apple.com/news/?id=jd9wcyov) apps submitted to the App Store to be built with Xcode 14.1 or later. The Experience Platform Mobile SDKs and extensions outlined below were built with prior versions of Xcode and are no longer compatible with iOS and iPadOS given Apple’s current App Store requirements. Consequently, on *August 31, 2023*, Adobe will be deprecating support for the following Experience Platform Mobile SDKs and wrapper extensions:

- [ACP iOS SDK](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#ios)
- [Cordova](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#cordova)
- [Flutter for ACP](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#flutter)
- [React Native for ACP](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#react-native)
- [Xamarin](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#xamarin)

After *August 31, 2023*, applications already submitted to the App Store that contain these SDKs and wrapper extensions will continue to operate, however, Adobe will not be providing security updates or bug fixes, and these SDKs and wrapper extensions will be provided as-is exclusive of any warranty, due to the App Store policy outlined above.

We encourage all customers to migrate to the latest Adobe Experience Platform versions of the Mobile SDK to ensure continued compatibility and support. Documentation for the latest versions of the Adobe Experience Platform Mobile SDKs can be found [here](https://developer.adobe.com/client-sdks/documentation/current-sdk-versions/). The iOS migration guide can be found [here](https://developer.adobe.com/client-sdks/previous-versions/documentation/migrate-to-swift/).

---

[![npm version](https://badge.fury.io/js/%40adobe%2Freact-native-acptarget.svg)](https://www.npmjs.com/package/@adobe/react-native-acptarget) 
[![npm downloads](https://img.shields.io/npm/dm/@adobe/react-native-acptarget)](https://www.npmjs.com/package/@adobe/react-native-acptarget)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/react-native-acptarget/main.svg?logo=circleci)](https://circleci.com/gh/adobe/workflows/react-native-acptarget) 
[![license](https://img.shields.io/npm/l/@adobe/react-native-acptarget.svg)](https://github.com/adobe/react-native-acptarget/blob/main/LICENSE)

`@adobe/react-native-acptarget` is a wrapper around the iOS and Android [AEP Target SDK](https://developer.adobe.com/client-sdks/previous-versions/documentation/adobe-target/) to allow for integration with React Native applications. Functionality to enable Adobe Target is provided entirely through JavaScript documented below.


## Installation

You need to install the SDK with [npm](https://www.npmjs.com/) and configure the native Android/iOS project in your react native project. Before installing the Target extension it is recommended to begin by installing the [Core extension](https://github.com/adobe/react-native-acpcore).

> Note: If you are new to React Native we suggest you follow the [React Native Getting Started](<https://facebook.github.io/react-native/docs/getting-started.html>) page before continuing.

### 1. Create React Native project

First create a React Native project:

```bash
react-native init MyReactApp
```

### 2. Install JavaScript packages

Install and link the `@adobe/react-native-acptarget` package:

```bash
cd MyReactApp
npm install @adobe/react-native-acptarget
```

#### 2.1 Link
This package requires React Native 0.60+ to build which supports [CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) to link the modules while building the app.

*Note* For `iOS` using `cocoapods`, run:

```bash
cd ios/ && pod install
```


## Tests
This project contains jest unit tests which are contained in the `__tests__` directory, to run the tests locally:
```
make run-tests-locally
```

## Usage

### Target

#### Importing the extension:
```javascript
import {ACPTarget} from '@adobe/react-native-acptarget';
```

#### Getting the extension version:

```javascript
ACPTarget.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPTarget version: " + version));
```

#### Registering the extension with ACPCore:

> Note: It is recommended to initialize the SDK via native code inside your AppDelegate and MainApplication in iOS and Android respectively.

##### **iOS**
```objective-c
#import <RCTACPTarget/ACPTarget.h>

[ACPTarget registerExtension];
```

##### **Android:**
```java
import com.adobe.marketing.mobile.Target;

Target.registerExtension();
```

#### Get custom visitor IDs:

```javascript
ACPTarget.getThirdPartyId().then(id => console.log("AdobeExperienceSDK: Third Party ID: " + id));
```

#### Set custom visitor IDs:

```javascript
ACPTarget.setThirdPartyId("thirdPartyId");
```

#### Reset user experience:

```javascript
ACPTarget.resetExperience();
```

#### Get Target user identifier:

```javascript
ACPTarget.getTntId().then(id => console.log("AdobeExperienceSDK: TNT ID " + id));
```

#### Load Target requests:

```javascript
var mboxParameters1 = {"status": "platinum"};
var mboxParameters2 = {"userType": "Paid"};
var purchaseIDs = ["34","125"];

var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
var targetProduct = new ACPTargetProduct("24D3412", "Books");
var parameters1 = new ACPTargetParameters(mboxParameters1, null, null, null);
var request1 = new ACPTargetRequestObject("mboxName2", parameters1, "defaultContent1", (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Adobe content:" + content);
  }
});

var parameters2 = new ACPTargetParameters(mboxParameters1, {"profileParameters": "parameterValue"}, targetProduct, targetOrder);
var request2 = new ACPTargetRequestObject("mboxName2", parameters2, "defaultContent2", (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Adobe content:" + content);
  }
});

var locationRequests = [request1, request2];
var profileParameters1 = {"ageGroup": "20-32"};

var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);
ACPTarget.retrieveLocationContent(locationRequests, parameters);
```

#### Using the prefetch APIs:

```javascript
var mboxParameters1 = {"status": "platinum"};
var mboxParameters2 = {"userType": "Paid"};
var purchaseIDs = ["34","125"];

var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
var targetProduct = new ACPTargetProduct("24D3412", "Books");
var parameters1 = new ACPTargetParameters(mboxParameters1, null, null, null);
var prefetch1 = new ACPTargetPrefetchObject("mboxName2", parameters1);

var parameters2 = new ACPTargetParameters(mboxParameters1, {"profileParameters": "parameterValue"}, targetProduct, targetOrder);
var prefetch2 = new ACPTargetPrefetchObject("mboxName2", parameters2);

var prefetchList = [prefetch1, prefetch2];
var profileParameters1 = {"ageGroup": "20-32"};

var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);
ACPTarget.prefetchContent(prefetchList, parameters).then(success => console.log(success)).catch(err => console.log(err));
```

#### Set preview restart deep link:

```javascript
ACPTarget.setPreviewRestartDeeplink("https://www.adobe.com");
```

#### Send an mbox click notification:

```javascript
var purchaseIDs = ["34","125"];

var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
var targetProduct = new ACPTargetProduct("24D3412", "Books");
var profileParameters1 = {"ageGroup": "20-32"};
var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

ACPTarget.locationClickedWithName("locationName", parameters);
```

#### Send an mbox location displayed notification:
```javascript
var purchaseIDs = ["34","125"];

var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
var targetProduct = new ACPTargetProduct("24D3412", "Books");
var profileParameters1 = {"ageGroup": "20-32"};
var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

ACPTarget.locationsDisplayed(["locationName", "locationName1"], parameters);
```

#### ACPTargetPrefetchObject:
The Target extension exports a class `ACPTargetPrefetchObject`.

```javascript
constructor(name?: string, targetParameters?: ACPTargetParameters);
```


#### ACPTargetRequestObject:
The Target extension exports a class `ACPTargetRequestObject`, which extends `ACPTargetPrefetchObject`.
```javascript
constructor(name: string, targetParameters: ACPTargetParameters, defaultContent: string);
```

#### ACPTargetOrder:
The Target extension exports a class `ACPTargetOrder`.
```javascript
constructor(orderId: string, total?: number, purchasedProductIds: Array<string>);
```

#### ACPTargetProduct:
The Target extension exports a class `ACPTargetOrder`.
```javascript
constructor(productId: string, categoryId: string);
```

#### ACPTargetParameters:
The Target extension exports a class `ACPTargetParameters`.
```javascript
constructor(parameters?: {string: string}, profileParameters?: {string: string}, product?: ACPTargetProduct, order?: ACPTargetOrder);
```

## Contributing 
See [CONTRIBUTING](CONTRIBUTING.md)

## License
See [LICENSE](LICENSE)
