import React from 'react';
import { SearchProductsComponent } from '../../components/SearchProductsComponent';
import { LatestSetsComponent } from '../../components/LatestSetsComponent';
import { useSession } from '@src/context/SessionContext';

export default function Popup(): JSX.Element {
  const { sessionId } = useSession();
  return (
      <div className="">
        <h1>sessionId {sessionId}</h1>
        <SearchProductsComponent />
        <LatestSetsComponent />
      </div>
  );
}
