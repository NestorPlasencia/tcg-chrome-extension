import React, { useEffect, useState } from 'react';
import { fetchLatestSets } from '../services/apiService';
import { LatestSetsByCategory } from '../types/types';
import { Table } from './Table';

export function LatestSetsComponent(): JSX.Element {
  const [categoryLatestSets, setLatestSets] = useState<LatestSetsByCategory[]>([]);

  useEffect(() => {
    fetchLatestSets([3])
      .then((sets: LatestSetsByCategory[]) => {
        setLatestSets(sets);
      })
      .catch((error: Error) => {
        console.error('Error fetching latest sets:', error);
      });
  }, []);

  const headers = ['Set Name', 'Clean Set Name', 'Release Date', 'Is Featured Set', 'Is Pre-Order'];

  return (
    <div>
      <h2>Latests Sets from Pokemon</h2>
      {categoryLatestSets.length > 0 &&
        categoryLatestSets.map((category, index) => (
          <div key={index}>
            <h3>Category ID: {category.categoryId}</h3>
            <Table
              headers={headers}
              data={category.latestSets.map(set => [
                set.setName,
                set.cleanSetName,
                set.releaseDate,
                set.isFeaturedSet,
                set.isPreOrder
              ])}
            />
          </div>
        ))
      }
    </div>
  );
}