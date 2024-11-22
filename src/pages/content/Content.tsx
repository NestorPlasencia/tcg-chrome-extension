import { SearchProducts } from "@src/components/request/tcgplayer/SearchProducts";
import { LatestSets } from "@src/components/request/tcgplayer/LatestSets";
import { ProductsForSkus } from "@src/components/request/tcgplayer/ProductsForSkus";
import { ProductLines } from "@src/components/request/tcgplayer/ProductLines";
import { ProductsByIds } from "@src/components/request/tcgplayer/ProductsByIds";
import { CatalogGroups } from "@src/components/request/tcgplayer/CatalogGroups";
import { useSession } from "@src/context/SessionContext";
import { Games } from "@src/components/request/tcgcompare/Games";
import { Categories } from "@src/components/request/tcgcompare/Categories";
import { SubCategories } from "@src/components/request/tcgcompare/SubCategories";
import { Deals } from "@src/components/request/tcgcompare/Deals";
import { Prices } from "@src/components/request/tcgcompare/Prices";
import { PricesHistory } from "@src/components/request/tcgcompare/PricesHistory";

import { useState } from "react";

export default function Content(): JSX.Element {
  const { tcgPlayerSessionId } = useSession();
  const isTcgPlayerDomain = window.location.hostname.includes("tcgplayer.com");
  const isTcgCompareDomain =
    window.location.hostname.includes("tcgcompare.com");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSize = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-white absolute top-5 left-5 p-2 ${isExpanded ? 'w-[600px] h-[600px] overflow-y-scroll' : 'w-[100px] h-[30px]'} z-[999]  break-words`}>
      <button onClick={toggleSize} className="mb-2">
        {isExpanded ? 'Reduce' : 'Expand'}
      </button>
      {isTcgPlayerDomain && isExpanded && (
        <>
          <h1>tcgPlayerSessionId {tcgPlayerSessionId}</h1>
          <ProductsByIds />
          <ProductLines />
          <ProductsForSkus />
          <LatestSets />
          <SearchProducts />
          <CatalogGroups />
        </>
      )}
      {isTcgCompareDomain && isExpanded &&(
        <>
          {/* 
          <Games />
          <Categories />
          <SubCategories />          
          */}
          <Deals />
          <Prices />
          <PricesHistory />
        </>
      )}
    </div>
  );
}
