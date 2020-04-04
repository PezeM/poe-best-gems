/* eslint-disable react/display-name */
import React, { useState, useEffect, useMemo } from 'react';
import api from '../../config/axios';
import { IPoeNinjaItemOverviewLine } from '../../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { isGemAwakened, getGemMaxLevel, getCorruptedGemMaxLevel } from '../../helpers/gem.helper';
import { Gem } from '../../models/gem';
import { GemTable } from './gemTable';
import { TableBooleanCell } from './Table/tableBooleanCell';

export const GemList = () => {
    const [gems, setGems] = useState<Gem[]>([]);
    const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
    const [showAwakenedGems, setShowAwakenedGems] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: 'Icon',
                accessor: 'icon',
                Cell: ({ cell: { value } }) => <img src={value} />,
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Gem level',
                accessor: 'gemLevel',
            },
            {
                Header: 'Corrupted',
                accessor: (d: Gem) => !!d.isCorrupted,
                Cell: ({ cell: { value } }) => <TableBooleanCell value={value} />,
            },
            {
                Header: 'Price difference',
                accessor: 'priceDifference',
            },
            {
                Header: 'Price difference per level',
                accessor: 'priceDifferencePerLevel',
            },
        ],
        [],
    );

    useEffect(() => {
        fetchGems();
    }, []);

    useEffect(() => {
        if (showAwakenedGems) {
            setFilteredGems(gems);
        } else {
            const availableGems = gems.filter(gem => !isGemAwakened(gem.baseGem));
            setFilteredGems(availableGems);
        }
    }, [showAwakenedGems]);

    function mapGems(gems: IPoeNinjaItemOverviewLine[]): Gem[] {
        const result: Gem[] = [];

        gems.filter(gem => gem.gemLevel === 1).forEach(gem => {
            const maxLevel = getGemMaxLevel(gem);
            const leveledGem = gems.find(g => g.name === gem.name && g.gemLevel === maxLevel);
            if (!leveledGem) {
                console.error(`Didn't found max level gem data for gem ${gem.name} with base level ${gem.gemLevel} and leveled ${maxLevel}`);
                return;
            }

            const corruptedGemLevel = getCorruptedGemMaxLevel(gem);
            const corruptedGem = gems.find(g => g.name === gem.name && g.gemLevel === corruptedGemLevel);

            result.push(new Gem(gem, leveledGem, corruptedGem));
        });

        return result;
    }

    async function fetchGems(): Promise<void> {
        const allGems = await api.getGems();
        if (!allGems) return;

        const mappedGems = mapGems(allGems.lines);
        setGems(mappedGems);
        setFilteredGems(mappedGems);
        setShowAwakenedGems(showAwakenedGems);
    }

    return (
        <div>
            <h3>Gems count {filteredGems.length}</h3>

            <div>
                <label>Show awakened gems</label>
                <input type="checkbox" checked={showAwakenedGems} onChange={() => setShowAwakenedGems(!showAwakenedGems)}></input>
                <button onClick={() => fetchGems()}>Refresh data</button>
            </div>

            {filteredGems && <GemTable columns={columns} data={filteredGems} />}
        </div>
    );
};
