
import React, { useEffect, useState } from "react";
import { fetchPrices } from "@src/services/tcgCompare";
import { Price } from "@src/types/tcgCompare";
import { Table } from "@src/components/Table";
import { useSession } from "@src/context/SessionContext";

export const Prices: React.FC = () => {
    const { tcgCompareToken } = useSession();
    const [prices, setPrices] = useState<Price[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPrices = async () => {
            try {
                const data = await fetchPrices('elite-trainer-boxes', 'pokemon-scarlet-violet-miraidon-elite-trainer-box', tcgCompareToken);
                setPrices(data);
            } catch (err) {
                setError("Failed to fetch prices");
            } finally {
                setLoading(false);
            }
        };

        loadPrices();
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
            <h2>Prices</h2>
            <Table
                headers={headers}
                data={prices.map(price => [
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