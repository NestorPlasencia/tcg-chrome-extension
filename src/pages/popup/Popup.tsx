import React from 'react';
import { SearchProductsComponent } from '../../components/SearchProductsComponent';
import { LatestSetsComponent } from '../../components/LatestSetsComponent';
import { ProductsForSkusComponent } from '../../components/ProductsForSkusComponent';
import { ProductLinesComponent } from '../../components/ProductLinesComponent';
import { ProductsByIdsComponent } from '../../components/ProductsByIdsComponent'; // Ensure this path is correct
import { useSession } from '@src/context/SessionContext';

export default function Popup(): JSX.Element {
  const { sessionId } = useSession();
  return (
    <div className="">
      <h1>sessionId {sessionId}</h1>
      <ProductsByIdsComponent />
      <ProductLinesComponent />
      <ProductsForSkusComponent />
      <LatestSetsComponent />
      <SearchProductsComponent />
    </div>
  );
}
