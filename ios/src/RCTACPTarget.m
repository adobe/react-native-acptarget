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
 */

#import "RCTACPTarget.h"
#import "RCTACPTargetDataBridge.h"
#import "ACPTarget.h"

@implementation RCTACPTarget

RCT_EXPORT_MODULE(ACPTarget);

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(extensionVersion: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([ACPTarget extensionVersion]);
}

RCT_EXPORT_METHOD(registerExtension) {
    [ACPTarget registerExtension];
}

RCT_EXPORT_METHOD(clearPrefetchCache) {
    [ACPTarget clearPrefetchCache];
}

RCT_EXPORT_METHOD(getThirdPartyId: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [ACPTarget getThirdPartyId:^(NSString * _Nullable thirdPartyId) {
        resolve(thirdPartyId);
    }];
}

RCT_EXPORT_METHOD(getTntId: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    [ACPTarget getTntId:^(NSString * _Nullable tntId) {
        resolve(tntId);
    }];
}

RCT_EXPORT_METHOD(loadRequests: (nonnull NSArray<NSDictionary*>*) requests
                  withProfileParameters: (nullable NSDictionary*) profileParameters) {
    NSMutableArray *requestObjectArr = [NSMutableArray array];
    for (NSDictionary *requestDict in requests) {
        ACPTargetRequestObject *requestObj = [RCTACPTargetDataBridge requestObjectFromDict:requestDict];
        [requestObjectArr addObject:requestObj];
    }
    
    [ACPTarget loadRequests:requestObjectArr withProfileParameters:profileParameters];
}

RCT_EXPORT_METHOD(prefetchContent: (nonnull NSArray<NSDictionary*>*) prefetchObjectArray
                  withProfileParameters: (nullable NSDictionary*) profileParameters
                  resolver:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    
    NSMutableArray *prefetchObjectArr = [NSMutableArray array];
    for (NSDictionary *prefetchDict in prefetchObjectArray) {
        ACPTargetPrefetchObject *prefetchObj = [RCTACPTargetDataBridge prefetchObjectFromDict:prefetchDict];
        [prefetchObjectArr addObject:prefetchObj];
    }
    
    [ACPTarget prefetchContent:prefetchObjectArr withProfileParameters:profileParameters callback:^(BOOL success) {
        if (success) {
            callback(@[[NSNull null]]);
        } else {
            callback(@[RCTMakeError(@"prefetchContent callback failed", nil, nil)]);
        }
    }];
}

RCT_EXPORT_METHOD(locationClicked: (nonnull NSString*) name
                  mboxParameters: (nullable NSDictionary*) mboxParameters
                  productParameters: (nullable NSDictionary*) productParameters
                  orderParameters: (nullable NSDictionary*) orderParameters
                  profileParameters: (nullable NSDictionary*) profileParameters) {
    [ACPTarget locationClickedWithName:name
                        mboxParameters:mboxParameters
                     productParameters:productParameters
                       orderParameters:orderParameters
                     profileParameters:profileParameters];
    
}

RCT_EXPORT_METHOD(resetExperience) {
    [ACPTarget resetExperience];
}

RCT_EXPORT_METHOD(setPreviewRestartDeeplink: (nonnull NSString*) deepLink) {
    NSURL *url = [NSURL URLWithString:deepLink];
    if (url) {
        [ACPTarget setPreviewRestartDeeplink:url];
    } else {
        NSLog(@"AdobeExperienceSDK: Error, deepLink is not a valid URL in locationClickedWithName");
    }
}

RCT_EXPORT_METHOD(setThirdPartyId: (nonnull NSString*) thirdPartyId) {
    [ACPTarget setThirdPartyId:thirdPartyId];
}

@end
  
