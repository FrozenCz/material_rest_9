
export class UtilFuncs {
    public static getBoolean(value: string | boolean | number): boolean {
        switch (value) {
            case '1':
            case 1:
            case 'true':
            case true:
            case 'on':
            case 'check':
                return true;
            default: return false;
        }
    }

    public static createMap<U, T>(params: { array: T[], propertyName?: string }): Map<U, T> {
        const {array, propertyName = 'uuid'} = params;
        const map: Map<U, T> = new Map();
        const key = propertyName as keyof T;
        // @ts-ignore
        array.forEach(a => map.set(a[key], a))
        return map;
    }
}
