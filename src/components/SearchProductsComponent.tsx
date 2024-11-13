import React, { useEffect, useState } from 'react';
import { searchProducts } from '../services/apiService';
import { SearchResponse, SearchRequestBody } from '../types/types';
import { useSession } from '../context/SessionContext';

export function SearchProductsComponent(): JSX.Element {
  const { sessionId } = useSession();
  const [data, setData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const requestBody: SearchRequestBody = {
          size: 20,
          from: 0,
          algorithm: "sales_exp_fields_synonym",
          context: {
            shippingCountry: "US",
            userProfile: {
              productLineAffinity: "Pokemon",
            },
          },
          filters: {
            exclude: {
              rarityName: ["Code Card", "Common", "Uncommon"],
              cardType: ["Land"],
            },
            range: {
              marketPrice: {
                gte: 10,
              },
            },
          },
          sessionId: sessionId || '',
        };

        const urlParams = "isList=true&mpfev=2933";

        searchProducts(requestBody, urlParams)
          .then((data: SearchResponse) => {
            setData(data);
          })
          .catch((error: Error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (sessionId) {
      fetchDataAsync();
    }
  }, [sessionId]);

  return (
    <div>
      {data && <pre className="text-left">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}