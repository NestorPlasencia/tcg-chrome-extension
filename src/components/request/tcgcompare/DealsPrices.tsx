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
  const [productPrices, setProductPrices] = useState<{ id: number, prices: Price[], topThreePrices: Price[] }[]>([]);



  useEffect(() => {
    const loadDeals = async () => {
      try {
        const deals = await fetchTcgCompareDeals(tcgCompareToken);
        const dealsEN = deals.filter(deal => deal.sub_category !== null)
        const dealsSorted = dealsEN.sort((a, b) => (((b.average - b.price) / b.average) - (a.average - a.price) / a.average));
        setDeals(dealsSorted);
        for (let i = 0; i < dealsSorted.length; i++) {
          const prices = await fetchPrices(dealsSorted[i].category.slug, dealsSorted[i].slug, tcgCompareToken);
          const pricesInStock = prices.filter(price => price.in_stock);
          const pricesSorted = pricesInStock.sort((a, b) => a.price - b.price);
          const topThreePrices = pricesSorted.slice(0, 3);
          setProductPrices(prev => [...prev, { id: dealsSorted[i].id, prices: pricesSorted, topThreePrices }]);
        }
      } catch (err) {
        setError("Failed to fetch deals");
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  const headers = ["ID", "Name", "Price", "Average", "Percentage", "Category", "Subcategory", "Site Name", "Url"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const convertToDollar = (value: number) => {
    return `$ ${value / 100}`
  }

  return (
    <div>
      <h2>TCG Compare Deals</h2>
      <Table
        headers={headers}
        data={deals.flatMap(deal => {
          const lowerPrice = productPrices.find(product => product.id === deal.id)?.prices[0];
          const topThreePrices = productPrices.find(product => product.id === deal.id)?.topThreePrices || [];

          const percentage = `${(((deal.average - deal.price) / deal.average) * 100).toFixed(2)} %`
          const baseRow = [
            deal.id,
            deal.name,
            convertToDollar(lowerPrice?.price || 0) || "N/A",
            convertToDollar(deal.average),
            percentage,
            deal.category.name,
            deal.sub_category?.name || "N/A",
            lowerPrice?.site.name || "N/A",
            `<a href=${lowerPrice?.url} target='_blank'>Link</a>` || "N/A"
          ];

          return [
            baseRow,
            ...topThreePrices.map((price, index) => [
              `${deal.id}-${index + 1}`,
              deal.name,
              convertToDollar(price.price),
              "N/A",
              "N/A",
              "N/A",
              "N/A",
              price.site.name,
              `<a href=${price.url} target='_blank'>Link</a>`
            ])
          ];
        })}
      />
    </div>
  );
};