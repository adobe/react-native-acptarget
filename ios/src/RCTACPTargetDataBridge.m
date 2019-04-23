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

#import "RCTACPTargetDataBridge.h"

@implementation RCTACPTargetDataBridge

+ (ACPTargetPrefetchObject *)prefetchObjectFromDict: (NSDictionary*) dict {
    ACPTargetPrefetchObject *obj = [ACPTargetPrefetchObject prefetchObjectWithName:dict[@"name"] mboxParameters:dict[@"mboxParameters"]];
    
    if (dict[@"productParameters"]) {
        [obj setProductParameters:dict[@"productParameters"]];
    }
    
    if (dict[@"orderParameters"]) {
        [obj setOrderParameters:dict[@"orderParameters"]];
    }
    
    return obj;
}

+ (ACPTargetRequestObject *)requestObjectFromDict: (NSDictionary*) dict {
    return nil;
}

@end
