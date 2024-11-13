
import React from 'react';

interface TableProps {
  headers: string[];
  data: (string | number | boolean)[][];
}

export function Table({ headers, data }: TableProps): JSX.Element {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="hover:bg-gray-50">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-2 px-4 border-b border-gray-200 text-sm text-gray-700">
                {typeof cell === 'boolean' ? (cell ? 'Yes' : 'No') : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}