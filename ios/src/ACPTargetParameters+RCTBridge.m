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

#import "ACPTargetParameters+RCTBridge.h"
#import "ACPTargetOrder+RCTBridge.h"
#import "ACPTargetProduct+RCTBridge.h"

@implementation ACPTargetParameters (RCTBridge)

NSString *const TARGET_PARAMETERS_KEY = @"parameters";
NSString *const PROFILE_PARAMETERS_KEY = @"profileParameters";
NSString *const ORDER_KEY = @"order";
NSString *const PRODUCT_KEY = @"product";

+ (ACPTargetParameters *)targetParametersFromDict:(NSDictionary *)dict {
    if (!dict || [dict isEqual:[NSNull null]]) {
        return nil;
    }
    
    ACPTargetProduct *product = [ACPTargetProduct targetProductFromDict:dict[PRODUCT_KEY]];
    ACPTargetOrder *order = [ACPTargetOrder targetOrderFromDict:dict[ORDER_KEY]];
    
    NSDictionary *parametersDict = [dict[TARGET_PARAMETERS_KEY] isEqual:[NSNull null]] ? nil : dict[TARGET_PARAMETERS_KEY];
    NSDictionary *profileParametersDict = [dict[PROFILE_PARAMETERS_KEY] isEqual:[NSNull null]] ? nil : dict[PROFILE_PARAMETERS_KEY];
    
    return [ACPTargetParameters targetParametersWithParameters:parametersDict
                                             profileParameters:profileParametersDict
                                                       product:product
                                                         order:order];
}

@end
