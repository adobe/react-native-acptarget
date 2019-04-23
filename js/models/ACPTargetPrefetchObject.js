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
*
* @flow
* @format
*/

'use strict';

const OrderId = "id";
const OrderTotal = "total";
const OrderPurchasedProductIds = "purchasedProductIds";
const ProductId = "id";
const ProductCategoryId = "categoryId";

class ACPTargetPrefetchObject {
  name:   string;
  mboxParameters: {string: string};
  productParameters: {string: string};
  orderParameters: {any: any};

  constructor(name?: string, mboxParameters?: {string: string}) {
  	this.name = name;
  	this.mboxParameters = mboxParameters;
  }

  setOrderParameters(orderId: string, orderTotal: number, purchasedProductIds: Array<string>) {
  	var cleanedProducts = purchasedProductIds.filter(function (e) {
    	return typeof e == 'string';
  	});

  	if (cleanedProducts.length != purchasedProductIds.length) {
  		console.log("AdobeExperienceSDK: Target Prefetch: Found invalid elements in purchased product ids. Removing non-string values.");
  	}

  	this.orderParameters = {OrderId : orderId, OrderTotal : orderTotal, OrderPurchasedProductIds : cleanedProducts};
  }

  setProductParameters(productId: string, categoryId: string) {
  	this.productParameters = {ProductId : productId, ProductCategoryId : categoryId};
  }

}

module.exports = ACPTargetPrefetchObject;
