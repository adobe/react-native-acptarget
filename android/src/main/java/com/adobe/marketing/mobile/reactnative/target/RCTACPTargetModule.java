/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
package com.adobe.marketing.mobile.reactnative.target;

import android.net.Uri;
import android.util.Log;

import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.InvalidInitException;
import com.adobe.marketing.mobile.Target;
import com.adobe.marketing.mobile.TargetParameters;
import com.adobe.marketing.mobile.TargetPrefetch;
import com.adobe.marketing.mobile.TargetRequest;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.Callback;

import java.util.ArrayList;
import java.util.HashMap;


public class RCTACPTargetModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private final String REQUEST_ID_KEY = "id";
  private HashMap<String, TargetRequest> registeredTargetRequests = new HashMap<>();

  public RCTACPTargetModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ACPTarget";
  }

  @ReactMethod
  public void extensionVersion(final Promise promise) {
    promise.resolve(Target.extensionVersion());
  }

  @ReactMethod
  public void registerExtension() {
    try {
      Target.registerExtension();
    } catch (InvalidInitException e) {
      Log.d(getName(), "Registering Target extension failed with error: " + e.getMessage());
    }
  }

  @ReactMethod
  public void clearPrefetchCache() {
    Target.clearPrefetchCache();
  }

  @ReactMethod
  public void getThirdPartyId(final Promise promise) {
    Target.getThirdPartyId(new AdobeCallback<String>() {
      @Override
      public void call(String thirdPartyId) {
        promise.resolve(thirdPartyId);
      }
    });
  }

  @ReactMethod
  public void getTntId(final Promise promise) {
    Target.getTntId(new AdobeCallback<String>() {
      @Override
      public void call(String tntId) {
        promise.resolve(tntId);
      }
    });
  }

  @ReactMethod
  public void setThirdPartyId(final String thirdPartyId) {
    Target.setThirdPartyId(thirdPartyId);
  }

  @ReactMethod
  public void resetExperience() {
    Target.resetExperience();
  }

  @ReactMethod
  public void setPreviewRestartDeeplink(final String deepLinkString) {
     Uri deepLink = null;
    try {
      deepLink = Uri.parse(deepLinkString);
    }catch(Exception e){
      e.printStackTrace();
    }

    if (deepLink != null) {
      Target.setPreviewRestartDeepLink(deepLink);
    } else {
      Log.d(getName(), "Deep link URI cannot be null");
    }
  }

  @ReactMethod
  public void retrieveLocationContent(ReadableArray targetRequestList, ReadableMap parameters) {
    ArrayList<TargetRequest> requestList = new ArrayList<>();
    for (int i = 0; i < targetRequestList.size(); i++) {
      String identifier = targetRequestList.getMap(i).getString(REQUEST_ID_KEY);

      if (registeredTargetRequests.containsKey(identifier)) {
        requestList.add(registeredTargetRequests.get(identifier));
      }
    }

    TargetParameters parametersObj = RCTACPTargetDataBridge.mapToParameters(parameters);

    Target.retrieveLocationContent(requestList, parametersObj);
  }

  @ReactMethod
  public void locationsDisplayed(ReadableArray mboxNames, ReadableMap parameters) {
    ArrayList<String> mboxNamesList = new ArrayList<>();
    for (int i = 0; i < mboxNames.size(); i++) {
      String mboxName = mboxNames.getString(i);
      mboxNamesList.add(mboxName);
    }

    TargetParameters parametersObj = RCTACPTargetDataBridge.mapToParameters(parameters);

    Target.locationsDisplayed(mboxNamesList, parametersObj);
  }

  @ReactMethod
  public void locationClickedWithName(String mboxName, ReadableMap parameters) {
    TargetParameters parametersObj = RCTACPTargetDataBridge.mapToParameters(parameters);

    Target.locationClicked(mboxName, parametersObj);
  }

  @ReactMethod
  public void prefetchContent(ReadableArray mboxPrefetchList, ReadableMap parameters, final Promise promise) {
    ArrayList<TargetPrefetch> prefetchList = new ArrayList<>();
    for (int i = 0; i < mboxPrefetchList.size(); i++) {
      TargetPrefetch prefetch = RCTACPTargetDataBridge.mapToPrefetch(mboxPrefetchList.getMap(i));
      prefetchList.add(prefetch);
    }

    TargetParameters parametersObj = RCTACPTargetDataBridge.mapToParameters(parameters);

    Target.prefetchContent(prefetchList, parametersObj, new AdobeCallback<String>() {
      @Override
      public void call(String s) {
        promise.resolve(s);
      }
    });
  }

  @ReactMethod
  public void registerTargetRequests(ReadableMap requestMap, Callback successCallback) {
    TargetRequest request = RCTACPTargetDataBridge.mapToRequest(requestMap, successCallback);
    registeredTargetRequests.put(requestMap.getString(REQUEST_ID_KEY), request);
  }

}
