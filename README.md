
# React Native AEP Target Extension

`@adobe/react-native-acptarget` is a wrapper around the iOS and Android [AEP Target SDK](https://aep-sdks.gitbook.io/docs/using-mobile-extensions/adobe-target) to allow for integration with React Native applications. Functionality to enable Adobe Audience Manager is provided entirely through JavaScript documented below.


## Installation

You need to install the SDK with [npm](https://www.npmjs.com/) and configure the native Android/iOS project in your react native project. Before installing the Target extension it is recommended to begin by installing the Core extension `@adobe/react-native-acpcore`.

### 1. Create React Native project

First create a React Native project:

```bash
react-native init MyReactApp
```

### 2. Install JavaScript packages

Install and link the `@adobe/react-native-acptarget` package:

```bash
npm install @adobe/react-native-acptarget
react-native link @adobe/react-native-acptarget
```

## Usage

### [Target](https://aep-sdks.gitbook.io/docs/using-mobile-extensions/adobe-target)

##### Importing the extension:
```javascript
import {ACPTarget} from '@adobe/react-native-acptarget';
```

##### Getting the extension version:

```javascript
ACPTarget.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPTarget version: " + version));
```

##### Registering the extension with ACPCore:

```javascript
ACPTarget.registerExtension();
```

##### Get custom visitor IDs

```javascript
ACPTarget.getThirdPartyId().then(id => console.log("AdobeExperienceSDK: Third Party ID: " + id));
```

##### Set custom visitor IDs

```javascript
ACPTarget.setThirdPartyId("thirdPartyId");
```

##### Reset user experience

```javascript
ACPTarget.resetExperience();
```

##### Get Target user identifier

```javascript
ACPTarget.getTntId().then(id => console.log("AdobeExperienceSDK: TNT ID " + id));
```

##### Load Target requests

```javascript
var mboxParameters1 = {"status": "platinum"};
var productParameters1 = {"id": "24D3412", "categoryId": "Books"};
var orderParameters1 = {"id": "ADCKKIM", "total": "344.30", "purchasedProductIds": "34, 125, 99"};
var mboxParameters2 = {"userType": "Paid"};
var productParameters2 = {"id": "764334", "categoryId": "Online"};
var purchaseIDs = ["id1","id2"];
var orderParameters2 = {"id": "4t4uxksa", "total": "54.90", "purchasedProductIds": purchaseIDs};

var request1 = new ACPTargetRequestObject("logo", "Bluewhale", mboxParameters1);
request1.productParameters = productParameters1;
request1.orderParameters = orderParameters1;

var request2 = new ACPTargetRequestObject("buttonColor", "red", mboxParameters2);
request2.productParameters = productParameters1;
request2.orderParameters = orderParameters1;

var requestArray = [request1, request2];
var profileParameters = {"age":"20-32"};

ACPTarget.loadRequests(requestArray, profileParameters);
```

##### Using the prefetch APIs

```javascript
var mboxParameters1 = {"status": "platinum"};
var productParameters1 = {"id": "24D3412", "categoryId": "Books"};
var orderParameters1 = {"id":"ADCKKIM", "total":"344.30", "purchasedProductIds": "34, 125, 99"};
var mboxParameters2 = {"userType": "Paid"};
var productParameters2 = {"id":"764334", "categoryId":"Online"};
var purchaseIDs = ["id1","id2"];
var orderParameters2 = {"id":"4t4uxksa", "total":"54.90", "purchasedProductIds":purchaseIDs};

var prefetch1 = new ACPTargetPrefetchObject("logo", mboxParameters1);
prefetch1.productParameters = productParameters1;
prefetch1.orderParameters = orderParameters1;

var prefetch2 = new ACPTargetPrefetchObject("buttonColor", mboxParameters2);
prefetch2.productParameters = productParameters2;
prefetch2.orderParameters = orderParameters2;

var prefetchArray = [prefetch1, prefetch2];
var profileParameters = {"age":"20-32"};

ACPTarget.prefetchContent(prefetchArray, {"profileParameters": profileParameters}).then(successful => console.log("AdobeExperienceSDK: Success = " + successful));
```

##### Set preview restart deep link

```javascript
ACPTarget.setPreviewRestartDeeplink("https://www.adobe.com");
```

##### Send an mbox click notification

```javascript
ACPTarget.locationClicked("name",
                          {"mboxParameterKeys": "mboxParameterValues"},
                          {"productParameterKeys": "productParameterValues"},
                          {"orderParametersKeys": "orderParametersValues"},
                          {"profileParameterKeys": "profileParameterValues"});
```

##### ACPTargetPrefetchObject
The Target extension exports a class `ACPTargetPrefetchObject`.

```javascript
constructor(name?: string, mboxParameters?: {string: string};
setOrderParameters(orderId: string, orderTotal: number, purchasedProductIds: Array<string>);
setProductParameters(productId: string, categoryId: string);
```


##### ACPTargetRequestObject
The Target extension exports a class `ACPTargetRequestObject`, which extends `ACPTargetPrefetchObject`.
```javascript
constructor(name: string, defaultContent: string, mboxParameters: {string: string});
```

## License

See LICENSE.md
