/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
@format
*/

jest.mock('NativeModules', () => ({
  ACPTarget: {
    extensionVersion: jest.fn(() => new Promise(resolve => resolve())),
    registerExtension: jest.fn(),
    clearPrefetchCache: jest.fn(),
    getThirdPartyId: jest.fn(() => new Promise(resolve => resolve())),
    getTntId: jest.fn(() => new Promise(resolve => resolve())),
    resetExperience: jest.fn(),
    setPreviewRestartDeeplink: jest.fn(),
    setThirdPartyId: jest.fn(),
    retrieveLocationContent: jest.fn(),
    prefetchContent: jest.fn(() => new Promise(resolve => resolve())),
    locationsDisplayed: jest.fn(),
    locationClickedWithName: jest.fn(),
    registerTargetRequests: jest.fn()
  },
}));
