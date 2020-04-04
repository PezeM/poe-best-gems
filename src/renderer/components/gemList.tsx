import React, { useState, useEffect } from 'react';
import api from '../../config/axios';
import { IPoeNinjaItemOverviewLine } from '../../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { isGemAwakened, getGemMaxLevel } from '../../helpers/gem.helper';
import { Gem } from '../../models/gem';

export const GemList = () => {
    const [gems, setGems] = useState<Gem[]>([]);
    const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
    const [showAwakenedGems, setShowAwakenedGems] = useState(true);

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

    async function fetchGems() {
        const allGems= await api.getGems();
        if(!allGems) return;

        const mappedGems = mapGems(allGems.lines);
        setGems(mappedGems);
        setFilteredGems(mappedGems);
        setShowAwakenedGems(true);
    }

    function mapGems(gems: IPoeNinjaItemOverviewLine[]) {
        const result: Gem[] = [];
        gems.forEach(gem => {
            const maxLevel = getGemMaxLevel(gem);
            const leveledGem = gems.find(g => g.name === gem.name && g.gemLevel === maxLevel);
            if(!leveledGem) {
                console.error(`Didn't found max level gem data for gem ${gem.name} with base level ${gem.gemLevel} and leveled ${maxLevel}`);
                return;
            }

            result.push(new Gem(gem, leveledGem));
        });

        return result;
    }

    return (
        <div>
            <h3>Ilość gemów {filteredGems.length}</h3>

            <div>
                <label>Show awakened gems</label>
                <input type="checkbox" checked={showAwakenedGems} 
                    onChange={() => setShowAwakenedGems(!showAwakenedGems)}></input>
                <button onClick={() => fetchGems()}>Refresh data</button>
            </div>

            {filteredGems && filteredGems.map((gem, index) => {
                return <div key={index}>
                    <h3>{gem.baseGem.name}</h3>
                    <img src={gem.baseGem.icon} />
                    <p>Value: {gem.baseGem.chaosValue} chaos</p>
                    <p>Level: {gem.baseGem.gemLevel} Quality: {gem.baseGem.gemQuality} P/L: {gem.baseGem.chaosValue/gem.baseGem.gemLevel}</p>
                    <p>Diff price: {gem.leveledGem.chaosValue - gem.baseGem.chaosValue}</p>
                </div>
            })}
        </div>
    )
}
