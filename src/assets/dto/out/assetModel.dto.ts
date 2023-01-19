import { AssetState } from '../../models/assets.entity';

export interface AssetsModelDto {
  id: number;
  category_id: number;
  name: string;
  quantity: number;
  user_id: number;
  serialNumber: string;
  inventoryNumber: string;
  evidenceNumber: string;
  identificationNumber: string;
  inquiryDate: Date;
  document: string;
  inquiryPrice: number;
  location_uuid: string | null;
  locationEtc: string;
  note: string;
  state: AssetState;
  removingProtocol_id: number | undefined;
  version: number;
}
