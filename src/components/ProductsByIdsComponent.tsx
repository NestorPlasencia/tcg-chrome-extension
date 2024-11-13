import React, { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../services/apiService';
import { Product } from '../types/types';
import { Table } from './Table';

export function ProductsByIdsComponent(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productIds = [593277, 566383, 566490, 587858, 566496, 566351, 173973, 272484, 232748, 509979];
    fetchProductsByIds(productIds)
      .then((products) => {
        setProducts(products);
      })
      .catch((error: Error) => {
        console.error('Error fetching products by IDs:', error);
      });
  }, []);

  const headers = ['Product ID', 'Product Name', 'Market Price', 'Lowest Price'];

  return (
    <div>
      <h2>Products By IDs</h2>
      {products?.length > 0 && (
        <Table
          headers={headers}
          data={products.map(product => [
            product.productId,
            product.productName,
            product.marketPrice,
            product.lowestPrice
          ])}
        />
      )}
    </div>
  );
}