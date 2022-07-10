import {SetMetadata} from "@nestjs/common";
import {RightsTag} from "../users/config/rights.list";

export const RightsAllowed = (rights: RightsTag) => SetMetadata('RightsAllowed', rights);
