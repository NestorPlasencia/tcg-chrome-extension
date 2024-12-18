
import React, { useEffect, useState } from 'react';
import { fetchCatalogGroups } from '@src/services/tcgPlayer';
import { CatalogGroup } from '@src/types/tcgplayer';
import { Table } from '@src/components/Table';

export function CatalogGroups(): JSX.Element {
    const [catalogGroups, setCatalogGroups] = useState<CatalogGroup[]>([]);

    useEffect(() => {
        fetchCatalogGroups()
            .then((response) => {
                setCatalogGroups(response);
            })
            .catch((error: Error) => {
                console.error('Error fetching catalog groups:', error);
            });
    }, []);

    const headers = ['Catalog Group ID', 'Name', 'Display Name', 'Is Direct', 'Is Active'];

    return (
        <div>
            <h2>Catalog Groups</h2>
            {catalogGroups?.length > 0 && (
                <Table
                    headers={headers}
                    data={catalogGroups.map(group => [
                        group.catalogGroupId,
                        group.name,
                        group.displayName,
                        group.isDirect,
                        group.isActive
                    ])}
                />
            )}
        </div>
    );
}