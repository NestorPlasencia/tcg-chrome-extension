export interface Aggregation {
  urlValue: string;
  isActive: boolean;
  value: string;
  count: number;
}
//algorithm	:	sales_exp_fields_synonym
//shippingCategoryId : 3
//productLineUrlName : Pokemon

export interface SetName extends Aggregation {}

export interface ProductTypeName extends Aggregation {}

export interface ProductLineName extends Aggregation {}

export interface ProductAttributes {
  number: string | null;
  description: string;
  flavorText: string | null;
  rarityDbName: string | null;
  releaseDate: string;
  detailNote: string;
  energyType: string[] | null;
  attack1: string | null;
  attack2: string | null;
  attack3: string | null;
  attack4: string | null;
  stage: string | null;
  cardType: string[] | null;
  cardTypeB: string | null;
  resistance: string | null;
  weakness: string | null;
  hp: string | null;
  retreatCost: string | null;
}

export interface Product {
  shippingCategoryId: number;
  duplicate: boolean;
  productLineUrlName: string;
  productUrlName: string;
  productTypeId: number;
  sealed: boolean;
  marketPrice: number;
  customAttributes: ProductAttributes;
  lowestPriceWithShipping: number;
  productName: string;
  setId: number;
  productId: number;
  rarityName: string | null;
  medianPrice: number | null;
  score: number;
  setName: string;
  foilOnly: boolean;
  setUrlName: string;
  sellerListable: boolean;
  totalListings: number;
  productLineId: number;
  productStatusId: number;
  productLineName: string;
  maxFulfillableQuantity: number;
  listings: Listing[];
  lowestPrice: number;
}

export interface Listing {
  directProduct: boolean;
  goldSeller: boolean;
  listingId: number;
  channelId: number;
  conditionId: number;
  verifiedSeller: boolean;
  directInventory: number;
  rankedShippingPrice: number;
  productId: number;
  printing: string;
  languageAbbreviation: string;
  sellerName: string;
  forwardFreight: boolean;
  sellerShippingPrice: number;
  language: string;
  shippingPrice: number;
  condition: string;
  languageId: number;
  score: number;
  directSeller: boolean;
  productConditionId: number;
  sellerId: string;
  listingType: string;
  sellerRating: number;
  sellerSales: string;
  quantity: number;
  sellerKey: string;
  price: number;
  customData: {
    images: string[];
  };
}

export interface SearchResponse {
  results: Product[];
  aggregations: {
    setName: SetName[];
    productTypeName: ProductTypeName[];
    productLineName: ProductLineName[];
  };
  algorithm: string;
  searchType: string;
  totalResults: number;
  resultId: string;
}

export interface SearchRequestResponse {
  errors: unknown[];
  results: SearchResponse[];
}

export interface SearchRequestBody {
  size: number;
  from: number;
  algorithm: string;
  context: {
    shippingCountry: string;
    userProfile: {
      productLineAffinity: string;
    };
  };
  filters: {
    exclude: {
      rarityName: string[];
      cardType: string[];
    };
    range: {
      marketPrice: {
        gte: number;
      };
    };
  };
  sessionId: string;
}

export interface LatestSet {
  setName: string;
  cleanSetName: string;
  releaseDate: string;
  isFeaturedSet: boolean;
  isPreOrder: boolean;
}

export interface LatestSetsByCategory {
  categoryId: number;
  latestSets: LatestSet[];
}

export interface GetProductsForSkusResponse {
  errors: unknown[];
  results: Product[][];
}

export interface ProductLine {
  productLineId: number;
  productLineName: string;
  productLineUrlName: string;
  isDirect: boolean;
}

export interface CatalogGroup {
  catalogGroupId: number;
  name: string;
  displayName: string;
  isDirect: boolean;
  isActive: boolean;
}
