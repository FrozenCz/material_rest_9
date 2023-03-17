export interface Barcode {
    id: number;
    name: string;
    found: boolean;
    location: {
        uuid: string;
        name: string;
        nfcId: string | null;
    } | null;
}
