import React, { useState, useEffect } from 'react';
import api from '../../config/axios';
import { IPoeNinjaItemOverviewLine } from '../../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';

export const GemList = () => {
    const [gems, setGems] = useState<IPoeNinjaItemOverviewLine[]>([]);

    useEffect(() => {
        const allGems = api.getGems().then(r => {
            if(!r) return;
            console.log(r.lines);
            setGems(r.lines);
        });
    }, []);

    return (
        <div>
            <h3>Ilość gemów {gems.length}</h3>
            <h3>Gemy bez Awakened {gems.filter(gem => !gem.name.includes('Awakened')).length}</h3>
            {gems && gems.map((gem, index) => {
                return <div key={index}>
                    <h3>{gem.name}</h3>
                    <p>Value: {gem.chaosValue} chaos</p>
                    <p>Level: {gem.gemLevel} Quality: {gem.gemQuality}</p>
                </div>
            })}
        </div>
    )
}
