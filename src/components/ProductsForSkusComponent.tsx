import React, { useEffect, useState } from 'react';
import { getProductsForSkus } from '../services/apiService';
import { Product } from '../types/types';
import { Table } from './Table';

export function ProductsForSkusComponent(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const skus = [6927956, 5667282, 7432290]; 

  useEffect(() => {
    getProductsForSkus(skus)
      .then((response: { results: Product[][] }) => {
        setProducts(response.results[0]);
      })
      .catch((error: Error) => {
        console.error('Error fetching products for SKUs:', error);
      });
  }, []);

  const headers = ['Product Name', 'Set Name', 'Market Price', 'Lowest Price', 'Release Date'];
  const data = products.map((product: Product) => [
    product.productName,
    product.setName,
    product.marketPrice,
    product.lowestPriceWithShipping,
    product.customAttributes.releaseDate,
  ]);

  return (
    <div>
      <h2>Products for SKUs</h2>
      {products.length > 0 && (
        <Table headers={headers} data={data} />
      )}
    </div>
  );
}