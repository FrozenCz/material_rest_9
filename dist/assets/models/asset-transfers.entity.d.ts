import { BaseEntity } from 'typeorm';
import { Assets } from './assets.entity';
import { Caretaker } from '../../users/dto/out/User.out.dto';
export declare class AssetTransfersEntity extends BaseEntity {
    uuid: string;
    caretakerFrom: Caretaker;
    caretakerTo: Caretaker;
    assets: Assets[];
    createdAt: Date;
    revertedAt: Date;
    acceptedAt: Date;
    rejectedAt: Date;
    message: string;
}
