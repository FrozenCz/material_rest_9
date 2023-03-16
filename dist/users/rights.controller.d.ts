import { CreateRightsDto } from "./dto/create-rights.dto";
import { Rights } from "./models/rights.entity";
import { Api } from 'src/api';
export declare class RightsController {
    private api;
    constructor(api: Api);
    getRights(): Promise<Rights[]>;
    createRights(createRightsDto: CreateRightsDto): Promise<Rights>;
}
