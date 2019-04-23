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

NSString *const NAME_KEY = @"name";
NSString *const MBOX_KEY = @"mboxParameters";
NSString *const PRODUCT_KEY = @"productParameters";
NSString *const ORDER_KEY = @"orderParameters";
NSString *const DEFAULT_CONTENT_KEY = @"defaultContent";

+ (ACPTargetPrefetchObject *)prefetchObjectFromDict: (NSDictionary*) dict {
    ACPTargetPrefetchObject *obj = [ACPTargetPrefetchObject prefetchObjectWithName:dict[NAME_KEY] mboxParameters:dict[MBOX_KEY]];
    
    if (dict[PRODUCT_KEY]) {
        [obj setProductParameters:dict[PRODUCT_KEY]];
    }
    
    if (dict[ORDER_KEY]) {
        [obj setOrderParameters:dict[ORDER_KEY]];
    }
    
    return obj;
}

+ (ACPTargetRequestObject *)requestObjectFromDict: (NSDictionary*) dict {
    ACPTargetRequestObject *obj = [ACPTargetRequestObject requestObjectWithName:dict[NAME_KEY] defaultContent:dict[DEFAULT_CONTENT_KEY] mboxParameters:dict[MBOX_KEY] callback:nil];
    
    if (dict[PRODUCT_KEY]) {
        [obj setProductParameters:dict[PRODUCT_KEY]];
    }
    
    if (dict[ORDER_KEY]) {
        [obj setOrderParameters:dict[ORDER_KEY]];
    }
    return obj;
}

@end
