import { Assets } from '../../assets/models/assets.entity';
export interface ICreateRemovingProtocol {
    removingDocumentIdentification: string;
    documentDate: Date;
    possibleRemovingDate: Date;
    assets: Assets[];
}
