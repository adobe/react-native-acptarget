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

#import "RCTACPTarget.h"
#import "ACPTarget.h"
#import "ACPTargetRequestObject+RCTBridge.h"
#import "ACPTargetParameters+RCTBridge.h"
#import "ACPTargetPrefetchObject+RCTBridge.h"

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

RCT_EXPORT_METHOD(retrieveLocationContent: (nonnull NSArray*) requests
                  withParameters: (nullable NSDictionary*) parameters) {
    
    NSMutableArray *requestsArr = [NSMutableArray array];
    for (NSDictionary *requestDict in requests) {
        ACPTargetRequestObject *obj = [ACPTargetRequestObject targetRequestObjectFromDict:requestDict];
        [requestsArr addObject:obj];
    }
    
    ACPTargetParameters *parametersObj = [ACPTargetParameters targetParametersFromDict:parameters];

    [ACPTarget retrieveLocationContent:requestsArr withParameters:parametersObj];
}

RCT_EXPORT_METHOD(prefetchContent: (nonnull NSArray*) prefetchObjectArray
                  withParameters: (nullable NSDictionary*) parameters
                        resolver:(RCTPromiseResolveBlock) resolve
                        rejecter:(RCTPromiseRejectBlock)reject) {
    NSMutableArray *prefetchObjArray = [NSMutableArray array];
    for (NSDictionary *prefetchDict in prefetchObjArray) {
        ACPTargetPrefetchObject *obj = [ACPTargetPrefetchObject prefetchObjectFromDict:prefetchDict];
        [prefetchObjArray addObject:obj];
    }
    
    ACPTargetParameters *parametersObj = [ACPTargetParameters targetParametersFromDict:parameters];
    
    [ACPTarget prefetchContent:prefetchObjArray withParameters:parametersObj callback:^(NSError * _Nullable error) {
        if (error) {
            NSString *errorCode = [NSString stringWithFormat:@"%ld", (long)error.code];
            reject(errorCode, [error localizedDescription], error);
        } else {
            resolve(@(YES));
        }
    }];
}

RCT_EXPORT_METHOD(locationsDisplayed: (nonnull NSArray*) mboxNames
                  withTargetParameters: (nullable NSDictionary*) parameters) {
    ACPTargetParameters *parametersObj = [ACPTargetParameters targetParametersFromDict:parameters];
    [ACPTarget locationsDisplayed:mboxNames withTargetParameters:parametersObj];
}

RCT_EXPORT_METHOD(locationClickedWithName: (nonnull NSString*) name
                  targetParameters: (nullable NSDictionary*) parameters) {
    ACPTargetParameters *parametersObj = [ACPTargetParameters targetParametersFromDict:parameters];
    [ACPTarget locationClickedWithName:name targetParameters:parametersObj];
}

@end
