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

import com.adobe.marketing.mobile.TargetPrefetch;
import com.facebook.react.bridge.ReadableMap;

public class RCTACPTargetDataBridge {

    final private static String NAME_KEY = "name";
    final private static String MBOX_PARAMETER_KEY = "mboxParameters";
    final private static String PRODUCT_PARAMETERS_KEY = "productParameters";
    final private static String ORDER_PARAMETERS_KEY = "orderParameters";

    public static TargetPrefetch mapToPrefetch(ReadableMap map) {
        TargetPrefetch.Builder prefetchBuilder = new TargetPrefetch.Builder(map.getString(NAME_KEY)).setMboxParameters(RCTACPTargetMapUtil.toStringMap(map.getMap(MBOX_PARAMETER_KEY)));
        if (!map.isNull(PRODUCT_PARAMETERS_KEY)) {
            prefetchBuilder.setOrderParameters(RCTACPTargetMapUtil.toMap(map.getMap(PRODUCT_PARAMETERS_KEY)));
        }

        if (!map.isNull(ORDER_PARAMETERS_KEY)) {
            prefetchBuilder.setProductParameters(RCTACPTargetMapUtil.toStringMap(map.getMap(ORDER_PARAMETERS_KEY)));
        }

        return prefetchBuilder.build();
    }

}
