import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assets } from './assets.entity';
import { Caretaker } from '../../users/dto/out/User.out.dto';

@Entity('asset_transfers')
export class AssetTransfersEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('jsonb')
  caretakerFrom: Caretaker;

  @Column('jsonb')
  caretakerTo: Caretaker;

  @ManyToMany(() => Assets)
  @JoinTable()
  assets: Assets[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  revertedAt: Date;

  @Column({ nullable: true })
  acceptedAt: Date;

  @Column({ nullable: true })
  rejectedAt: Date;

  @Column({ nullable: true })
  message: string;
}
