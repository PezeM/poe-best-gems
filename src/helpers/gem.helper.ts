import { IPoeNinjaItemOverviewLine } from '../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { MAX_GEM_LEVELS } from '../data/maxGemLevels';
import { MAX_CORRUPTED_GEM_LEVELS } from '../data/maxCorruptedGemLevels';

const STR_AWAKENED_GEM = 'Awakened';
const AWAKENED_GEM_MAX_LEVEL = 1;
const AWAKENED_CORRUPTED_GEM_MAX_LEVEL = 6;
const DEFAULT_GEM_MAX_LEVEL = 20;
const DEFAULT_CORRUPTED_GEM_MAX_LEVEL = 21;

export function isGemAwakened(gem: IPoeNinjaItemOverviewLine): boolean {
    return gem.name.includes(STR_AWAKENED_GEM);
}

export function getGemMaxLevel(gem: IPoeNinjaItemOverviewLine): number {
    if (isGemAwakened(gem)) {
        return AWAKENED_GEM_MAX_LEVEL;
    }

    const maxGemLevel = MAX_GEM_LEVELS[gem.name];
    if (maxGemLevel) return maxGemLevel;
    return DEFAULT_GEM_MAX_LEVEL;
}

export function getCorruptedGemMaxLevel(gem: IPoeNinjaItemOverviewLine): number {
    if (isGemAwakened(gem)) {
        return AWAKENED_CORRUPTED_GEM_MAX_LEVEL;
    }

    const maxGemLevel = MAX_CORRUPTED_GEM_LEVELS[gem.name];
    if (maxGemLevel) return maxGemLevel;
    return DEFAULT_CORRUPTED_GEM_MAX_LEVEL;
}
