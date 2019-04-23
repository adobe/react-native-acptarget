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
import {ACPTarget} from '@adobe/react-native-acptarget';

type Props = {};
export default class App extends Component<Props> {
  render() {
    this.initSDK();
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ marginTop: 75 }}>
        <Text style={styles.welcome}>ACPCore Test App</Text>
        <Button title="ACPCore::extensionVersion()" onPress={() => this.coreExtensionVersion()}/>
        <Button title="ACPTarget::extensionVersion()" onPress={this.targetExtensionVersion()}/>

        </ScrollView>
      </View>
    );
  }

  initSDK() {
    // console.log("AdobeExperienceSDK IMPORT: ACPCore = " + ACPCore);
    // console.log("AdobeExperienceSDK IMPORT: ACPLifecycle = " + ACPLifecycle);
    // console.log("AdobeExperienceSDK IMPORT: ACPSignal = " + ACPSignal);
    // console.log("AdobeExperienceSDK IMPORT: ACPIdentity = " + ACPIdentity);
    // console.log("AdobeExperienceSDK IMPORT: ACPMobileLogLevel = " + ACPMobileLogLevel);
    // console.log("AdobeExperienceSDK IMPORT: ACPMobilePrivacyStatus = " + ACPMobilePrivacyStatus);
    // console.log("AdobeExperienceSDK IMPORT: ACPMobileVisitorAuthenticationState = " + ACPMobileVisitorAuthenticationState);
    // console.log("AdobeExperienceSDK IMPORT: ACPVisitorID = " + ACPVisitorID);
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
