import { IGem } from '../interfaces/gem.interface';
import { IPoeNinjaItemOverviewLine } from '../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { getGemMaxLevelXp } from '../helpers/gem.helper';
import { roundWithPrecision } from '../helpers/math.helper';

export class Gem implements IGem {
    readonly baseGem: IPoeNinjaItemOverviewLine;
    readonly leveledGem: IPoeNinjaItemOverviewLine;
    readonly corruptedGem?: IPoeNinjaItemOverviewLine;

    constructor(baseGem: IPoeNinjaItemOverviewLine, leveledGem: IPoeNinjaItemOverviewLine, corruptedGem?: IPoeNinjaItemOverviewLine) {
        this.baseGem = baseGem;
        this.leveledGem = leveledGem;
        this.corruptedGem = corruptedGem;
    }

    get price(): number {
        return this.baseGem.chaosValue;
    }

    get corruptedGemPrice(): number {
        return this.corruptedGem?.chaosValue ?? 0;
    }

    get leveledGemPrice(): number {
        return this.leveledGem.chaosValue;
    }

    get gemLevel(): number {
        return this.baseGem.gemLevel;
    }

    get priceDifference(): number {
        return Math.round(this.leveledGem.chaosValue - this.baseGem.chaosValue);
    }

    get priceDifferencePerLevel(): number {
        const levelDifference = Math.max(1, this.leveledGem.gemLevel - this.baseGem.gemLevel);
        return roundWithPrecision(this.priceDifference / levelDifference, 2);
    }

    get differenceBetweenLeveledAndCorrupted(): number {
        if (!this.corruptedGem) return 0;
        return roundWithPrecision(this.corruptedGem.chaosValue - this.leveledGem.chaosValue, 2);
    }

    get name(): string {
        return this.baseGem.name;
    }

    get icon(): string {
        return this.baseGem.icon;
    }

    get isCorrupted(): boolean {
        return this.baseGem.corrupted;
    }

    get xpNeededToLevelUp(): number {
        return getGemMaxLevelXp(this.baseGem);
    }

    get chaosPerMilionXp(): number {
        if (this.xpNeededToLevelUp === 0) return 0;
        return roundWithPrecision(this.leveledGem.chaosValue / (this.xpNeededToLevelUp / 1000000), 2);
    }

    get chaosPerMilionXpIfCorrupted(): number {
        if (!this.corruptedGem || this.xpNeededToLevelUp === 0) return 0;
        return roundWithPrecision(this.corruptedGem.chaosValue / (this.xpNeededToLevelUp / 1000000), 2);
    }
}
