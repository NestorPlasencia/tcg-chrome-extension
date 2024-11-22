
import React, { useEffect, useState } from "react";
import { fetchPriceHistory } from "@src/services/tcgCompare";
import { Price } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const PricesHistory: React.FC = () => {
  const { tcgCompareToken } = useSession();
  const [priceHistory, setPriceHistory] = useState<Price[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPriceHistory = async () => {
      try {
        const data = await fetchPriceHistory('elite-trainer-boxes', 'pokemon-scarlet-violet-miraidon-elite-trainer-box', tcgCompareToken);
        setPriceHistory(data);
      } catch (err) {
        setError("Failed to fetch price history");
      } finally {
        setLoading(false);
      }
    };

    loadPriceHistory();
  }, [tcgCompareToken]);

  const headers = ["ID", "Site", "Name", "Price", "In Stock", "Visits"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Price History</h2>
      <Table
        headers={headers}
        data={priceHistory.map(price => [
          price.id,
          price.site.name,
          price.name,
          price.price,
          price.in_stock,
          price.visits
        ])}
      />
    </div>
  );
};