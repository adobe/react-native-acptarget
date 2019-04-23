/** ***********************************************************************
*
* Copyright 2019 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
*
* @flow
* @format
*/

'use strict';

const RCTACPTarget = require('react-native').NativeModules.ACPTarget;

module.exports = {
  /**
   * @brief Returns the current version of the ACPTarget Extension.
   */
  extensionVersion(): Promise<string> {
    return Promise.resolve(RCTACPTarget.extensionVersion());
  },

  /**
   * @brief Registers the ACPTarget extension with the Core Event Hub.
   */
  registerExtension() {
    RCTACPTarget.registerExtension();
  },

  /**
   *  @brief Clears prefetched mboxes.
   *
   *  Clears the cached prefetched ACPTargetPrefetchObject array.
   *
   *  @see ACPTarget::prefetchContent:withProfileParameters:callback:
   */
  clearPrefetchCache() {
    RCTACPTarget.clearPrefetchCache();
  },

  /**
   *  @brief Gets the custom visitor ID for Target
   *  @param callback will be invoked to return the thirdPartyId value or `nil` if
   *  no third-party ID is set
   */
  getThirdPartyId(): Promise<string> {
    return Promise.resolve(RCTACPTarget.getThirdPartyId());
  },

  /**
   *  @brief Gets the Test and Target user identifier
   *
   *  Retrieves the TnT ID returned by the Target server for this visitor. The TnT ID is set to the
   *  Mobile SDK after a successful call to prefetch content or load requests.
   *
   *  This ID is preserved between app upgrades, is saved and restored during the standard application
   *  backup process, and is removed at uninstall or when ACPTarget::resetExperience is called.
   *
   *  @param callback invoked with the current tnt id or `nil` if no tnt id is set.
   *
   *  @see ACPTarget::prefetchContent:withProfileParameters:callback:
   *  @see ACPTarget::loadRequests:withProfileParameters:
   *  @see ACPTarget::resetExperience
   */
  getTntId(): Promise<string> {
    return Promise.resolve(RCTACPTarget.getTntId());
  },

  // TODO loadRequests, prefetchContent

  /**
   * @brief Sends a click notification to Target if a click metric is defined for the provided location name.
   *
   * Click notification can be sent for a location provided a load request has been executed for that prefetched or regular mbox
   * location before, indicating that the mbox was viewed. This request helps Target record the clicked event for the given location or mbox.
   *
   * @param name NSString value representing the name for location/mbox
   * @param mboxParameters optional dictionary of key-value pairs representing mbox parameters for this request
   * @param productParameters optional dictionary of key-value pairs representing product parameters for this request
   * @param orderParameters optional dictionary of key-value pairs representing order parameters for this request
   * @param profileParameters optional dictionary of key-value pairs representing profile parameters for this request
   *
   * @see ACPTarget::loadRequests:withProfileParameters:
   * @see ACPTarget::prefetchContent:withProfileParameters:callback
   */
  locationClicked(string: name, {string: string}: mboxParameters, {string: string}: productParameters, {string: any}: orderParameters, {string: string}: profileParameters) {
    RCTACPTarget.locationClicked(name, mboxParameters, productParameters, orderParameters, profileParameters);
  },

  /**
   *  @brief Resets the user's experience
   *
   *  Resets the user's experience by removing the visitor identifiers.
   *  Removes previously set third-party and TnT IDs from persistent storage.
   */
  resetExperience() {
    RCTACPTarget.resetExperience();
  },

  /**
   *  @brief Sets the Target preview restart deep link
   *
   *  Set the Taget preview URL to be displayed when the preview mode is restarted.
   *
   *  @param deeplink the URL which will be set for preview restart
   */
  setPreviewRestartDeeplink(string: deepLink) {
    RCTACPTarget.setPreviewRestartDeeplink(deepLink);
  },

  /**
   *  @brief Sets the custom visitor ID for Target
   *
   *  Sets a custom ID to identify visitors (profiles). This ID is preserved between app upgrades,
   *  is saved and restored during the standard application backup process, and is removed at uninstall or
   *  when ACPTarget::resetExperience is called.
   *
   *  @param thirdPartyId a string pointer containing the value of the third party id (custom visitor id)
   *  @see ACPTarget::resetExperience
   */
  setThirdPartyId(string: thirdPartyId) {
    RCTACPTarget.setThirdPartyId(thirdPartyId);
  },

};
