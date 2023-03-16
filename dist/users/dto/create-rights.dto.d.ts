import { RightsCategoryEnum, RightsTag } from "../config/rights.list";
export declare class CreateRightsDto {
    name: string;
    tag: RightsTag;
    description?: string;
    relatedTo: RightsCategoryEnum;
}
