import React, { useEffect, useState } from 'react';
import { searchProducts } from '../services/apiService';
import { SearchRequestBody, Product } from '../types/types';
import { useSession } from '../context/SessionContext';
import { Table } from './Table'; // Importa el componente Table

export function SearchProductsComponent(): JSX.Element {
  const { sessionId } = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (sessionId) {
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

        searchProducts(requestBody)
          .then((data: Product[]) => {
            setProducts(data);
          })
          .catch((error: Error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, [sessionId]);


  const headers = ['Product Name', 'Market Price', 'Rarity', 'Set Name', 'Release Date'];
  const data = products.map((product: Product) => [
    product.productName,
    product.marketPrice,
    product.customAttributes?.rarityDbName || '',
    product.setName,
    product.customAttributes?.releaseDate || '',
  ]) || [];

  return (
    <div>
      {products && (
        <Table headers={headers} data={data} />
      )}
    </div>
  );
}