
import React, { useEffect, useState } from "react";
import { fetchTcgCompareSubCategories } from "@src/services/tcgCompare";
import { SubCategory } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const SubCategories: React.FC = () => {
  const { tcgCompareToken } = useSession();

  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSubCategories = async () => {
      try {
        const data = await fetchTcgCompareSubCategories(tcgCompareToken);
        setSubCategories(data);
      } catch (err) {
        setError("Failed to fetch sub-categories");
      } finally {
        setLoading(false);
      }
    };

    loadSubCategories();
  }, []);

  const headers = ["ID", "Name", "Slug", "Series", "Released At", "Total Cards"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>TCG Compare Sub-Categories</h2>
      <Table
        headers={headers}
        data={subCategories.map(subCategory => [
          subCategory.id,
          subCategory.name,
          subCategory.slug,
          subCategory.meta.series,
          subCategory.meta.released_at,
          subCategory.meta.total_cards
        ])}
      />
    </div>
  );
};