export interface IPoeNinjaItemOverviewLine {
    id: number;
    name: string;
    icon: string;
    mapTier: number;
    levelRequired: number;
    baseType?: any;
    stackSize: number;
    variant?: any;
    prophecyText?: any;
    artFilename?: any;
    links: number;
    itemClass: number;
    sparkline: any;
    lowConfidenceSparkline: any;
    implicitModifiers: any[];
    explicitModifiers: any[];
    flavourText: string;
    corrupted: boolean;
    gemLevel: number;
    gemQuality: number;
    itemType: string;
    chaosValue: number;
    exaltedValue: number;
    count: number;
    detailsId: string;
}
