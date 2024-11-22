import React, { useEffect, useState } from 'react';
import { searchProducts } from '@src/services/tcgPlayer';
import { SearchRequestBody, Product } from '@src/types/tcgplayer';
import { useSession } from '@src/context/SessionContext';
import { Table } from '@src/components/Table';

export function SearchProducts(): JSX.Element {
  const { tcgPlayerSessionId } = useSession();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (tcgPlayerSessionId) {
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
          sessionId: tcgPlayerSessionId || '',
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
  }, [tcgPlayerSessionId]);


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
      <h2>Search Products By Algorithm</h2>
      {products && (
        <Table headers={headers} data={data} />
      )}
    </div>
  );
}