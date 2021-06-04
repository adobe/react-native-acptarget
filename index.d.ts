type Params = Record<string, string>;

declare module '@adobe/react-native-acptarget' {
  type MBox = string;

  export class ACPTargetOrder {
    constructor(orderId: string, total?: number, purchasedProductIds: string[]);

    orderId: string;
    total: number | undefined;
    purchasedProductIds: string[];
  }

  export class ACPTargetProduct {
    constructor(productId: string, categoryId: string);

    productId: string;
    categoryId: string;
  }

  export class ACPTargetParameters {
    constructor(
      params?: Params,
      profileParams?: Params,
      product?: ACPTargetProduct,
      order?: ACPTargetOrder,
    );

    parameters: Params | undefined;
    profileParameters: Params | undefined;
    product: undefined;
    order: ACPTargetOrder | undefined;
  }

  export class ACPTargetPrefetchObject {
    constructor(name?: string, params: ACPTargetParameters);

    targetParameters: ACPTargetParameters;
  }

  export class ACPTargetRequestObject extends ACPTargetPrefetchObject {
    constructor(
      name?: string,
      params: ACPTargetParameters,
      defaultContent: string,
      cb: (err: Error | null, content: string | null) => void,
    );

    defaultContent: string;
    id: string;
  }

  interface ACPTarget {
    clearPrefetchCache(): void;
    extensionVersion(): Promise<string>;
    getThirdPartyId(): Promise<string>;
    getTntId(): Promise<string>;
    registerExtension(): void;
    resetExperience(): void;
    setPreviewRestartDeeplink(deeplink: string): void;
    setThirdPartyId(thirdPartyId: string): void;
    retrieveLocationContent(): void;
    retrieveLocationContent(requests: ACPTargetRequestObject[], params?: ACPTargetParameters): void;
    prefetchContent(
      prefetchList: ACPTargetPrefetchObject[],
      params?: ACPTargetParameters,
    ): Promise<any>;
    locationsDisplayed(mboxNames: MBox[], params?: ACPTargetParameters): void;
    locationClickedWithName(name: string, params?: ACPTargetParameters): void;
  }
  export const ACPTarget: ACPTarget;
}
