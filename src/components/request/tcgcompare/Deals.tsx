
import React, { useEffect, useState } from "react";
import { fetchTcgCompareDeals } from "@src/services/tcgCompare";
import { Product } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const Deals: React.FC = () => {
  const { tcgCompareToken } = useSession();

  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const data = await fetchTcgCompareDeals(tcgCompareToken);
        setDeals(data);
      } catch (err) {
        setError("Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const headers = ["ID", "Name", "Price", "Average", "In Stock"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>TCG Compare Deals</h2>
      <Table
        headers={headers}
        data={deals.map(deal => [
          deal.id,
          deal.name,
          deal.price,
          deal.average,
          deal.in_stock ? "Yes" : "No"
        ])}
      />
    </div>
  );
};