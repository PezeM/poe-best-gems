/* eslint-disable react/display-name */
import React, { useState, useEffect, useMemo } from 'react';
import api from '../../config/axios';
import { IPoeNinjaItemOverviewLine } from '../../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { isGemAwakened, getGemMaxLevel, getCorruptedGemMaxLevel } from '../../helpers/gem.helper';
import { Gem } from '../../models/gem';
import { GemTable } from './gemTable';
import { TableBooleanCell } from './Table/tableBooleanCell';
import { Checkbox, Button } from 'antd';

export const GemList = () => {
    const [gems, setGems] = useState<Gem[]>([]);
    const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
    const [showAwakenedGems, setShowAwakenedGems] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);

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
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Price leveled',
                accessor: 'leveledGemPrice',
            },
            {
                Header: 'Price difference',
                accessor: 'priceDifference',
            },
            {
                Header: 'Price difference per level',
                accessor: 'priceDifferencePerLevel',
            },
            {
                Header: 'Chaos per 1M/XP',
                accessor: 'chaosPerMilionXp',
            },
            {
                Header: 'Chaos per 1M/XP Corrupted',
                accessor: 'chaosPerMilionXpIfCorrupted',
            },
            {
                Header: 'Price corrupted',
                accessor: 'corruptedGemPrice',
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
        setIsLoadingData(true);
        const allGems = await api.getGems();
        if (!allGems) return;

        const mappedGems = mapGems(allGems.lines);
        setGems(mappedGems);
        setFilteredGems(mappedGems);
        setShowAwakenedGems(showAwakenedGems);
        setIsLoadingData(false);
    }

    return (
        <div>
            <h3>Gems count {filteredGems.length}</h3>

            <div>
                <Checkbox checked={showAwakenedGems} onChange={() => setShowAwakenedGems(!showAwakenedGems)}>
                    Show awakened gems
                </Checkbox>
                <Button type="primary" loading={isLoadingData} onClick={() => fetchGems()}>
                    Refresh data
                </Button>
            </div>

            {filteredGems && <GemTable columns={columns} data={filteredGems} />}
        </div>
    );
};
