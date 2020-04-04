import { IGem } from '../interfaces/gem.interface';
import { IPoeNinjaItemOverviewLine } from '../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';

export class Gem implements IGem {
    readonly baseGem: IPoeNinjaItemOverviewLine;
    readonly leveledGem: IPoeNinjaItemOverviewLine;
    readonly corruptedGem?: IPoeNinjaItemOverviewLine;

    constructor(baseGem: IPoeNinjaItemOverviewLine, leveledGem: IPoeNinjaItemOverviewLine, corruptedGem?: IPoeNinjaItemOverviewLine) {
        this.baseGem = baseGem;
        this.leveledGem = leveledGem;
        this.corruptedGem = corruptedGem;
    }

    get gemLevel(): number {
        return this.baseGem.gemLevel;
    }

    get priceDifference(): number {
        return Math.round(this.leveledGem.chaosValue - this.baseGem.chaosValue);
    }

    get priceDifferencePerLevel(): number {
        const levelDifference = Math.max(1, this.leveledGem.gemLevel - this.baseGem.gemLevel);
        return Math.round(this.priceDifference / levelDifference);
    }

    get differenceBetweenLeveledAndCorrupted(): number {
        if (!this.corruptedGem) return 0;
        return Math.round(this.corruptedGem.chaosValue - this.leveledGem.chaosValue);
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
}
