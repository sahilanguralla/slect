declare class GeneralUtils {
    static similarity(s1: string, s2: string, exactMatch?: boolean): number;
    static editDistance(s1: string, s2: string): number;
    static areEqualArrays<T>(array1: T[], array2: T[]): boolean;
}
export default GeneralUtils;
