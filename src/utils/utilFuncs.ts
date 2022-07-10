
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
}
