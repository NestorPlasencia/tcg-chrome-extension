import React, { useEffect, useState } from "react";
import { fetchTcgCompareGames } from "@src/services/tcgCompare";
import { Game } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const Games: React.FC = () => {
  const { tcgCompareToken } = useSession();

  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchTcgCompareGames(tcgCompareToken);
        setGames(data);
      } catch (err) {
        setError("Failed to fetch games");
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  const headers = ["ID", "Name", "slug"];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>TCG Compare Games</h2>
      <Table
        headers={headers}
        data={games.map(game => [
          game.id,
          game.name,
          game.slug
        ])}
      />
    </div>
  );
};