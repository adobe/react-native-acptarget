/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, NativeModules} from 'react-native';
import {ACPCore, ACPLifecycle, ACPSignal, ACPIdentity, ACPMobileLogLevel, ACPMobilePrivacyStatus, ACPMobileVisitorAuthenticationState, ACPVisitorID, ACPExtensionEvent} from '@adobe/react-native-acpcore';
import {ACPTarget, ACPTargetPrefetchObject} from '@adobe/react-native-acptarget';

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
        <Button title="ACPTarget::locationClicked()" onPress={() => this.locationClicked()}/>
        <Button title="ACPTarget::resetExperience()" onPress={() => this.resetExperience()}/>
        <Button title="ACPTarget::setPreviewRestartDeeplink()" onPress={() => this.setPreviewRestartDeeplink()}/>
        <Button title="ACPTarget::setThirdPartyId()" onPress={() => this.setThirdPartyId()}/>
        <Button title="ACPTarget::loadRequests()" onPress={() => this.loadRequests()}/>
        <Button title="ACPTarget::prefetchContent()" onPress={() => this.prefetchContent()}/>

        </ScrollView>
      </View>
    );
  }

  initSDK() {
    ACPCore.setLogLevel(ACPMobileLogLevel.VERBOSE);
    ACPCore.configureWithAppId("launch-EN1a68f9bc5b3c475b8c232adc3f8011fb");
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

  locationClicked() {
    ACPTarget.locationClicked("name", {"mboxParameterKeys": "mboxParameterValues"}, {"productParameterKeys": "productParameterValues"}, {"orderParametersKeys": "orderParametersValues"}, {"profileParameterKeys": "profileParameterValues"});
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

  loadRequests() {

  }

  prefetchContent() {
    var arr = [];
    var obj = new ACPTargetPrefetchObject("name", {"mboxParameter": "values"});
    obj.setOrderParameters({"orderParam": "value"});
    obj.setProductParameters({"productParameters": "value"});
    arr[0] = obj;
    arr[1] = new ACPTargetPrefetchObject("name1", {"mboxParameter": "values"});
    ACPTarget.prefetchContent(arr, {"profileParameters": "params"}).then(successful => console.log("AdobeExperienceSDK: Success = " + successful));
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
