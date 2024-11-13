
import React, { useEffect, useState } from 'react';
import { fetchLatestSets } from '../services/apiService';
import { CategoryLatestSets } from '../types/types';

export function LatestSetsComponent(): JSX.Element {
  const [categoryLatestSets, setLatestSets] = useState<CategoryLatestSets[]>([]);

  useEffect(() => {
    fetchLatestSets([3])
      .then((sets: CategoryLatestSets[]) => {
        setLatestSets(sets);
      })
      .catch((error: Error) => {
        console.error('Error fetching latest sets:', error);
      });
  }, []);

  return (
    <div>
      {categoryLatestSets.length > 0 && 
        categoryLatestSets.map((category, index) => (
          <div key={index}>
            {category.categoryId}
            {category.latestSets.map((set, setIndex) => (
              <div key={setIndex}>{set.setName}</div>
            ))}
          </div>
        ))
      }
    </div>
  );
}