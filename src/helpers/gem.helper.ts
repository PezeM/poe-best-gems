import { IPoeNinjaItemOverviewLine } from "src/interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface";
import { MAX_GEM_LEVELS } from "../data/maxGemLevels";

const STR_AWAKENED_GEM = "Awakened";
const AWAKENED_GEM_MAX_LEVEL = 1;
const AWAKENED_CORRUPTED_GEM_MAX_LEVEL = 6;
const DEFAULT_GEM_MAX_LEVEL = 20;
const DEFAULT_CORRUPTED_GEM_MAX_LEVEL = 21;

export function isGemAwakened(gem: IPoeNinjaItemOverviewLine): boolean {
    return gem.name.includes(STR_AWAKENED_GEM);
}

export function getGemXP() {

}

export function getGemMaxLevel(gem: IPoeNinjaItemOverviewLine) {
    if(isGemAwakened(gem)) {
        return AWAKENED_GEM_MAX_LEVEL;
    }

    const maxGemLevel = MAX_GEM_LEVELS[gem.name];
    if (maxGemLevel) return maxGemLevel;
    return DEFAULT_GEM_MAX_LEVEL;
}

export function getCorruptedGemMaxLevel(gem: IPoeNinjaItemOverviewLine) {
    if(isGemAwakened(gem)) {
        return AWAKENED_GEM_MAX_LEVEL;
    }
}