import { IGem } from "../interfaces/gem.interface";
import { IPoeNinjaItemOverviewLine } from "../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface";

export class Gem implements IGem {
    baseGem: IPoeNinjaItemOverviewLine;
    leveledGem: IPoeNinjaItemOverviewLine;

    constructor(baseGem: IPoeNinjaItemOverviewLine, leveledGem: IPoeNinjaItemOverviewLine) {
        this.baseGem = baseGem;
        this.leveledGem = leveledGem;
    }
}