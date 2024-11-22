import React, { useEffect, useState } from "react";
import { fetchTcgCompareCategories } from "@src/services/tcgCompare";
import { Category } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const Categories: React.FC = () => {

  const { tcgPlayerSessionId, tcgCompareToken } = useSession(); 

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchTcgCompareCategories(tcgCompareToken);
        setCategories(data);
      } catch (err) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const headers = ["ID", "Name", "Slug", "Product Count"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>TCG Compare Categories</h2>
      <Table
        headers={headers}
        data={categories.map(category => [
          category.id,
          category.name,
          category.slug,
          category.product_count
        ])}
      />
    </div>
  );
};