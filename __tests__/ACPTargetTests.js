/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
@flow
@format
*/

import { NativeModules } from 'react-native';
import ACPTarget from '../js/ACPTarget';
import ACPTargetPrefetchObject from '../js/models/ACPTargetPrefetchObject';
import ACPTargetRequestObject from '../js/models/ACPTargetRequestObject';
import ACPTargetOrder from '../js/models/ACPTargetOrder';
import ACPTargetProduct from '../js/models/ACPTargetProduct';
import ACPTargetParameters from '../js/models/ACPTargetParameters';

describe('ACPTarget', () => {

  test('extensionVersion is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'extensionVersion');
    await ACPTarget.extensionVersion();
    expect(spy).toHaveBeenCalled();
  });

  test('registerExtension is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'registerExtension');
    await ACPTarget.registerExtension();
    expect(spy).toHaveBeenCalled();
  });

  test('clearPrefetchCache is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'clearPrefetchCache');
    await ACPTarget.clearPrefetchCache();
    expect(spy).toHaveBeenCalled();
  });

  test('getTntId is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'getTntId');
    await ACPTarget.getTntId();
    expect(spy).toHaveBeenCalled();
  });

  test('resetExperience is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'resetExperience');
    await ACPTarget.resetExperience();
    expect(spy).toHaveBeenCalled();
  });

  test('setPreviewRestartDeeplink is called with correct parameter', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'setPreviewRestartDeeplink');
    let url = "adobe.com";
    await ACPTarget.setPreviewRestartDeeplink(url);
    expect(spy).toHaveBeenCalledWith(url);
  });

  test('setThirdPartyId is called with correct parameter', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'setThirdPartyId');
    let id = "thirdPartyTestId";
    await ACPTarget.setThirdPartyId(id);
    expect(spy).toHaveBeenCalledWith(id);
  });

  test('retrieveLocationContent is called with correct parameters', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'retrieveLocationContent');
    var mboxParameters1 = {"status": "platinum"};
    var mboxParameters2 = {"userType": "Paid"};
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var parameters1 = new ACPTargetParameters(mboxParameters1, null, null, null);
    var request1 = new ACPTargetRequestObject("mboxName2", parameters1, "defaultContent1");

    var parameters2 = new ACPTargetParameters(mboxParameters1, {"profileParameters": "parameterValue"}, targetProduct, targetOrder);
    var request2 = new ACPTargetRequestObject("mboxName2", parameters2, "defaultContent2");

    var locationRequests = [request1, request2];
    var profileParameters1 = {"ageGroup": "20-32"};

    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);
    await ACPTarget.retrieveLocationContent(locationRequests, parameters);

    expect(spy).toHaveBeenCalledWith(locationRequests, parameters);
  });

  test('locationsDisplayed is called with correct parameters', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'locationsDisplayed');
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var profileParameters1 = {"ageGroup": "20-32"};
    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

    await ACPTarget.locationsDisplayed(["locationName", "locationName1"], parameters);
    expect(spy).toHaveBeenCalledWith(["locationName", "locationName1"], parameters);
  });

  test('locationClickedWithName is called with correct parameters', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'locationClickedWithName');
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var profileParameters1 = {"ageGroup": "20-32"};
    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

    await ACPTarget.locationClickedWithName("locationName", parameters);

    expect(spy).toHaveBeenCalledWith("locationName", parameters);
  });

  test('prefetchContent is called with correct parameters', async () => {
    const spy = jest.spyOn(NativeModules.ACPTarget, 'prefetchContent');
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

    await ACPTarget.prefetchContent(prefetchList, parameters).then(success => console.log(success)).catch(err => console.log(err));

    expect(spy).toHaveBeenCalledWith(prefetchList, parameters);
  });

});
