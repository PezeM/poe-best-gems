import { IPoeNinjaItemOverviewLine } from '../interfaces/poe-ninja/poeNinjaItemOvierviewLine.interface';
import { MAX_GEM_LEVELS } from '../data/maxGemLevels';
import { MAX_CORRUPTED_GEM_LEVELS } from '../data/maxCorruptedGemLevels';
import { EMPOWER_SUPPORT_XP_TABLE, GEM_NORMAL_XP_TABLE, BLOOD_AND_SAND_XP_TABLE } from '../data/gemXpTable';

const STR_AWAKENED_GEM = 'Awakened';
const AWAKENED_GEM_MAX_LEVEL = 1;
const AWAKENED_CORRUPTED_GEM_MAX_LEVEL = 6;
const DEFAULT_GEM_MAX_LEVEL = 20;
const DEFAULT_CORRUPTED_GEM_MAX_LEVEL = 21;

export function isGemAwakened(gem: IPoeNinjaItemOverviewLine): boolean {
    return gem.name.includes(STR_AWAKENED_GEM);
}

export function isGemEmpowerer(gem: IPoeNinjaItemOverviewLine): boolean {
    switch (gem.name) {
        case 'Empower Support':
            return true;
        case 'Enhance Support':
            return true;
        case 'Enlighten Support':
            return true;

        default:
            return false;
    }
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

export function getGemMaxLevelXp(gem: IPoeNinjaItemOverviewLine): number {
    if (isGemAwakened(gem)) {
        return 0;
    }

    if (isGemEmpowerer(gem)) {
        return EMPOWER_SUPPORT_XP_TABLE[3];
    }

    if (gem.name === 'Blood and Sand') {
        return BLOOD_AND_SAND_XP_TABLE[6];
    } else if (gem.name === 'Brand Recall') {
        return 0;
    } else if (gem.name === 'Detonate Mines') {
        return 0;
    } else if (gem.name === 'Portal') {
        return 0;
    }

    return GEM_NORMAL_XP_TABLE[20];
}
