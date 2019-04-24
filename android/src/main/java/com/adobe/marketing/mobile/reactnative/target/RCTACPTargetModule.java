/* ***********************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2019 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

package com.adobe.marketing.mobile.reactnative.target;

import android.net.Uri;
import android.util.Log;

import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.InvalidInitException;
import com.adobe.marketing.mobile.Target;
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
import java.util.List;
import java.util.Map;


public class RCTACPTargetModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

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
    Uri deepLink = Uri.parse(deepLinkString);

    if (deepLink != null) {
      Target.setPreviewRestartDeepLink(deepLink);
    } else {
      Log.d(getName(), "Deep link URI cannot be null");
    }
  }

  @ReactMethod
  public void locationClicked(final String mboxName,
                                     final ReadableMap mboxParameters,
                                     final ReadableMap productParameters,
                                     final ReadableMap orderParameters,
                                     final ReadableMap profileParameters) {
    Map<String, String> mboxParametersConverted = RCTACPTargetMapUtil.toStringMap(mboxParameters);
    Map<String, String> productParametersConverted = RCTACPTargetMapUtil.toStringMap(productParameters);
    Map<String, Object> orderParametersConverted = RCTACPTargetMapUtil.toMap(orderParameters);
    Map<String, String> profileParametersConverted = RCTACPTargetMapUtil.toStringMap(profileParameters);

    Target.locationClicked(mboxName, mboxParametersConverted, productParametersConverted, orderParametersConverted, profileParametersConverted);
  }

  @ReactMethod
  public static void prefetchContent(final ReadableArray targetPrefetchList,
                                     final ReadableMap profileParameters,
                                     final Promise promise) {
    List<TargetPrefetch> prefetchList = new ArrayList<>();
    for (int i = 0; i < targetPrefetchList.size(); i++) {
      TargetPrefetch prefetchObj = RCTACPTargetDataBridge.mapToPrefetch(targetPrefetchList.getMap(i));
      prefetchList.add(prefetchObj);
    }

    Map<String, String> profileParametersConverted = RCTACPTargetMapUtil.toStringMap(profileParameters);

    Target.prefetchContent(prefetchList, profileParametersConverted, new AdobeCallback<Boolean>() {
      @Override
      public void call(Boolean success) {
        promise.resolve(success);
      }
    });

  }

  @ReactMethod
  public static void loadRequests(final ReadableArray targetRequestList,
                                  final ReadableMap profileParameters) {
    List<TargetRequest> requestList = new ArrayList<>();
    for (int i = 0; i < targetRequestList.size(); i++) {
      TargetRequest requestObj = RCTACPTargetDataBridge.mapToRequest(targetRequestList.getMap(i));
      requestList.add(requestObj);
    }

    Map<String, String> profileParametersConverted = RCTACPTargetMapUtil.toStringMap(profileParameters);
    Target.loadRequests(requestList, profileParametersConverted);
  }


}