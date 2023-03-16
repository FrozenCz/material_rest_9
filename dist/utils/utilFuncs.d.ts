export declare class UtilFuncs {
    static getBoolean(value: string | boolean | number): boolean;
    static createMap<U, T>(params: {
        array: T[];
        propertyName?: string;
    }): Map<U, T>;
}
