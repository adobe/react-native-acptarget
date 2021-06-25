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

'use strict';

const RCTACPTarget = require('react-native').NativeModules.ACPTarget;

import type {ACPTargetPrefetchObject} from './models/ACPTargetPrefetchObject';
import type {ACPTargetRequestObject} from './models/ACPTargetRequestObject';
import type {ACPTargetOrder} from './models/ACPTargetOrder';
import type {ACPTargetProduct} from './models/ACPTargetProduct';
import type {ACPTargetParameters} from './models/ACPTargetParameters';

module.exports = {

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
   * @brief Returns the current version of the ACPTarget Extension.
   */
  extensionVersion(): Promise<string> {
    return Promise.resolve(RCTACPTarget.extensionVersion());
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
  setPreviewRestartDeeplink(deepLink: string) {
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
  setThirdPartyId(thirdPartyId: string) {
    RCTACPTarget.setThirdPartyId(thirdPartyId);
  },

  /**
   *  @brief Retrieves content for multiple Target mbox locations at once.
   *
   *  Executes a batch request to your configured Target server for multiple mbox locations. Any prefetched content
   *  which matches a given mbox location is returned and not included in the batch request to the Target server.
   *  Each object in the array contains a callback function, which will be invoked when content is available for
   *  its given mbox location.
   *
   *  @param requests An array of ACPTargetRequestObject objects to retrieve content
   *  @param parameters a TargetParameters object containing parameters for all locations in the requests array
   *
   *  @see ACPTargetRequestObject
   */
   retrieveLocationContent(requests: Array<ACPTargetRequestObject>, parameters?: ACPTargetParameters) {
     RCTACPTarget.retrieveLocationContent(requests, parameters);
   },

   /**
   *  @brief Prefetch multiple Target mboxes simultaneously.
   *
   *  Executes a prefetch request to your configured Target server with the ACPTargetPrefetchObject list provided
   *  in the \p prefetchObjectArray parameter. This prefetch request will use the provided parameters for all of
   *  the prefetches made in this request. The \p callback will be executed when the prefetch has been completed, returning
   *  an error object, nil if the prefetch was successful or error description if the prefetch was unsuccessful.
   *  The prefetched mboxes are cached in memory for the current application session and returned when requested.
   *
   *  @param prefetchObjectArray an array of ACPTargetPrefetchObject representing the desired mboxes to prefetch
   *  @param parameters a TargetParameters object containing parameters for all the mboxes in the request array
   *  @param callback a function pointer which will be called after the prefetch is complete.  The error parameter
   *         in the callback will be nil if the prefetch completed successfully, or will contain error message otherwise
   *
   *  @see ACPTargetPrefetchObject
   */
   prefetchContent(prefetchObjectArray: Array<ACPTargetPrefetchObject>, parameters?: ACPTargetParameters): Promise<any> {
     return RCTACPTarget.prefetchContent(prefetchObjectArray, parameters);
   },

   /**
   * Sends a display notification to Target for given prefetched mboxes. This helps Target record location display events.
   *
   * @param mboxNames (required) an array of displayed locaitons names
   * @param parameters {@link TargetParameters} for the displayed location
   */
   locationsDisplayed(mboxNames: Array<string>, parameters?: ACPTargetParameters) {
     RCTACPTarget.locationsDisplayed(mboxNames, parameters);
   },

   /**
   * @brief Sends a click notification to Target if a click metric is defined for the provided location name.
   *
   * Click notification can be sent for a location provided a load request has been executed for that prefetched or regular mbox
   * location before, indicating that the mbox was viewed. This request helps Target record the clicked event for the given location or mbox.
   *
   * @param name NSString value representing the name for location/mbox
   * @param parameters a TargetParameters object containing parameters for the location clicked
   */
   locationClickedWithName(name: string, parameters?: ACPTargetParameters) {
     RCTACPTarget.locationClickedWithName(name, parameters);
   },

};
