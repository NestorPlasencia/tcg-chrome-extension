import React, { useEffect, useState } from "react";
import { fetchPrices, fetchTcgCompareDeals } from "@src/services/tcgCompare";
import { Price, Product } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const DealsPrices: React.FC = () => {
  const { tcgCompareToken } = useSession();

  const [deals, setDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productPrices, setProductPrices] = useState<{ id: number, prices: Price[] }[]>([]);



  useEffect(() => {
    const loadDeals = async () => {
      try {
        const deals = await fetchTcgCompareDeals(tcgCompareToken);
        const dealsEN = deals.filter(deal => deal.sub_category !== null)
        const dealsSorted = dealsEN.sort((a, b) => ((a.average - a.price)/a.average) - ((b.average -b.price)/b.average));
        setDeals(dealsSorted);
        for (let i = 0; i < dealsSorted.length; i++) {
          const prices  = await fetchPrices(dealsSorted[i].category.slug, dealsSorted[i].slug , tcgCompareToken);
          const pricesInStock = prices.filter(price => price.in_stock);
          const pricesSorted = pricesInStock.sort((a, b) => a.price - b.price);
          setProductPrices(prev => [...prev, { id: dealsSorted[i].id, prices: pricesSorted }]);
        }
      } catch (err) {
        setError("Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const headers = ["ID", "Name", "Price", "Average", "In Stock", "Subcategory", "Cheapest Price", "Site Name", "Url"];	

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
          deal.in_stock ? "Yes" : "No",
          deal.sub_category?.name || "N/A",
          productPrices.find(product => product.id === deal.id)?.prices[0].price || "N/A",
          productPrices.find(product => product.id === deal.id)?.prices[0].site.name || "N/A",
          productPrices.find(product => product.id === deal.id)?.prices[0].url || "N/A"
        ])}
      />
    </div>
  );
};