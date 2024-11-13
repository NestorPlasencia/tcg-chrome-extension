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
  medianPrice: number;
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
  listings: unknown[];
  lowestPrice: number;
}

export interface SearchResponse {
  errors: unknown[];
  results: Product[];
  aggregations: {
    setName: SetName[];
    productTypeName: SetName[];
    productLineName: SetName[];
  };
  algorithm: string;
  searchType: string;
  totalResults: number;
  resultId: string;
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

export interface CategoryLatestSets {
  categoryId: number;
  latestSets: LatestSet[];
}
