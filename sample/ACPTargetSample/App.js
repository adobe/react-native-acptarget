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

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, NativeModules} from 'react-native';
import {ACPCore, ACPLifecycle, ACPSignal, ACPIdentity, ACPMobileLogLevel, ACPMobilePrivacyStatus, ACPMobileVisitorAuthenticationState, ACPVisitorID, ACPExtensionEvent} from '@adobe/react-native-acpcore';
import {ACPTarget, ACPTargetPrefetchObject, ACPTargetRequestObject, ACPTargetOrder, ACPTargetProduct, ACPTargetParameters} from '@adobe/react-native-acptarget';

type Props = {};
export default class App extends Component<Props> {
  render() {
    this.initSDK();
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ marginTop: 75 }}>
        <Text style={styles.welcome}>ACPTarget Test App</Text>
        <Button title="ACPCore::extensionVersion()" onPress={() => this.coreExtensionVersion()}/>
        <Button title="ACPTarget::extensionVersion()" onPress={() => this.targetExtensionVersion()}/>
        <Button title="ACPTarget::clearPrefetchCache()" onPress={() => this.clearPrefetchCache()}/>
        <Button title="ACPTarget::getThirdPartyId()" onPress={() => this.getThirdPartyId()}/>
        <Button title="ACPTarget::getTntId()" onPress={() => this.getTntId()}/>
        <Button title="ACPTarget::resetExperience()" onPress={() => this.resetExperience()}/>
        <Button title="ACPTarget::setPreviewRestartDeeplink(...)" onPress={() => this.setPreviewRestartDeeplink()}/>
        <Button title="ACPTarget::setThirdPartyId(...)" onPress={() => this.setThirdPartyId()}/>
        <Button title="ACPTarget::retrieveLocationContent(...)" onPress={() => this.retrieveLocationContent()}/>
        <Button title="ACPTarget::prefetchContent(...)" onPress={() => this.prefetchContent()}/>
        <Button title="ACPTarget::locationsDisplayed(...)" onPress={() => this.locationsDisplayed()}/>
        <Button title="ACPTarget::locationClickedWithName(...)" onPress={() => this.locationClickedWithName()}/>

        </ScrollView>
      </View>
    );
  }

  initSDK() {
    ACPCore.setLogLevel(ACPMobileLogLevel.VERBOSE);
    ACPCore.configureWithAppId("launch-EN1415e24e288342f58e3caf6271cd34aa-development");
    ACPLifecycle.registerExtension();
    ACPIdentity.registerExtension();
    ACPSignal.registerExtension();
    ACPTarget.registerExtension();
    ACPCore.start();
  }

  coreExtensionVersion() {
    ACPCore.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPCore version: " + version));
  }

  targetExtensionVersion() {
    ACPTarget.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPTarget version: " + version));
  }

  clearPrefetchCache() {
    ACPTarget.clearPrefetchCache();
  }

  getThirdPartyId() {
    ACPTarget.getThirdPartyId().then(id => console.log("AdobeExperienceSDK: Third Party ID: " + id));
  }

  getTntId() {
    ACPTarget.getTntId().then(id => console.log("AdobeExperienceSDK: TNT ID " + id));
  }

  resetExperience() {
    ACPTarget.resetExperience();
  }

  setPreviewRestartDeeplink() {
    ACPTarget.setPreviewRestartDeeplink("https://www.adobe.com");
  }

  setThirdPartyId() {
    ACPTarget.setThirdPartyId("thirdPartyId");
  }

  retrieveLocationContent() {
    var mboxParameters1 = {"status": "platinum"};
    var mboxParameters2 = {"userType": "Paid"};
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var parameters1 = new ACPTargetParameters(mboxParameters1, null, null, null);
    var request1 = new ACPTargetRequestObject("clickTestRyan", parameters1, "defaultContent1");

    var parameters2 = new ACPTargetParameters(mboxParameters2, {"profileParameters": "parameterValue"}, targetProduct, targetOrder);
    var request2 = new ACPTargetRequestObject("mboxName2", parameters2, "defaultContent2");

    var locationRequests = [request1, request2];
    var profileParameters1 = {"ageGroup": "20-32"};

    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);
    ACPTarget.retrieveLocationContent(locationRequests, parameters);
  }

  locationsDisplayed() {
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var profileParameters1 = {"ageGroup": "20-32"};
    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

    ACPTarget.locationsDisplayed(["clickTestRyan", "clickTestRyan"], null);
  }

  locationClickedWithName() {
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var profileParameters1 = {"ageGroup": "20-32"};
    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);

    ACPTarget.locationClickedWithName("clickTestRyan", parameters);
  }

  prefetchContent() {
    var mboxParameters1 = {"status": "platinum"};
    var mboxParameters2 = {"userType": "Paid"};
    var purchaseIDs = ["34","125"];

    var targetOrder = new ACPTargetOrder("ADCKKIM", 344.30, purchaseIDs);
    var targetProduct = new ACPTargetProduct("24D3412", "Books");
    var parameters1 = new ACPTargetParameters(mboxParameters1, null, null, null);
    var prefetch1 = new ACPTargetPrefetchObject("clickTestRyan", parameters1);

    var parameters2 = new ACPTargetParameters(mboxParameters2, {"profileParameters": "parameterValue"}, targetProduct, targetOrder);
    var prefetch2 = new ACPTargetPrefetchObject("mboxName2", parameters2);

    var prefetchList = [prefetch1, prefetch2];
    var profileParameters1 = {"ageGroup": "20-32"};

    var parameters = new ACPTargetParameters({"parameters": "parametervalue"}, profileParameters1, targetProduct, targetOrder);
    ACPTarget.prefetchContent(prefetchList, parameters).then(success => console.log(success)).catch(err => console.log(err));
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  }
});
