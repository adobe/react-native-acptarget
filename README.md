
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
// TODO
```

##### Using the prefetch APIs

```javascript
import {ACPTargetPrefetchObject} from '@adobe/react-native-acptarget';

var arr = [];
var obj = new ACPTargetPrefetchObject("name", {"mboxParameter": "values"});
obj.setOrderParameters({"orderParam": "value"});
obj.setProductParameters({"productParameters": "value"});
arr[0] = obj;
arr[1] = new ACPTargetPrefetchObject("name1", {"mboxParameter": "values"});
ACPTarget.prefetchContent(arr, {"profileParameters": "params"}).then(successful => console.log("AdobeExperienceSDK: Success = " + successful));
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

## License

See LICENSE.md
