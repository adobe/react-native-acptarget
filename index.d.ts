declare module '@adobe/react-native-acptarget' {
  export class ACPTarget {
    static clearPrefetchCache(): void
    static resetExperience(): void
    static retrieveLocationContent(
      requests: ACPTargetRequestObject[],
      parameters: ACPTargetParameters
    )
  }
  export class ACPTargetPrefetchObject {
    name: string
    targetParameters: ACPTargetParameters

    constructor(name?: string, targetParameters?: ACPTargetParameters) {
      this.name = name
      this.targetParameters = targetParameters
    }
  }
  export class ACPTargetRequestObject extends ACPTargetPrefetchObject {
    defaultContent: string

    constructor(
      name: string,
      targetParameters: ACPTargetParameters,
      defaultContent: string,
      callback: (error: Error, content: string) => void
    ) {
      this.defaultContent = defaultContent
      super(name, targetParameters, defaultContent, callback)
    }
  }
  export class ACPTargetOrder {
    orderId: string
    total: number
    purchasedProductIds: Array<string>

    constructor(orderId: string, total?: number, purchasedProductIds: Array<string>) {
      this.orderId = orderId
      this.total = total
      this.purchasedProductIds = purchasedProductIds
    }
  }
  export class ACPTargetProduct {
    productId: string
    categoryId: string

    constructor(productId: string, categoryId: string) {
      this.productId = productId
      this.categoryId = categoryId
    }
  }
  export class ACPTargetParameters {
    parameters: { [string]: string }
    profileParameters: { [string]: string }
    order: ACPTargetOrder
    product: ACPTargetProduct

    constructor(
      parameters?: { [string]: string },
      profileParameters?: { string: string },
      product?: ACPTargetProduct,
      order?: ACPTargetOrder
    ) {
      this.parameters = parameters
      this.profileParameters = profileParameters
      this.product = product
      this.order = order
    }
  }
}
