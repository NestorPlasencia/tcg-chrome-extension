
import React, { useEffect, useState } from 'react';
import { fetchProductLines } from '../services/apiService';
import { ProductLine } from '../types/types';
import { Table } from './Table';

export function ProductLinesComponent(): JSX.Element {
  const [productLines, setProductLines] = useState<ProductLine[]>([]);

  useEffect(() => {
    fetchProductLines()
      .then((response) => {
        setProductLines(response);
      })
      .catch((error: Error) => {
        console.error('Error fetching product lines:', error);
      });
  }, []);

  const headers = ['Product Line ID', 'Product Line Name', 'Product Line URL Name', 'Is Direct'];

  return (
    <div>
      <h2>Product Lines</h2>
      {productLines?.length > 0 && (
        <Table
          headers={headers}
          data={productLines.map(line => [
            line.productLineId,
            line.productLineName,
            line.productLineUrlName,
            line.isDirect
          ])}
        />
      )}
    </div>
  );
}