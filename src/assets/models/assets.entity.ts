import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  VersionColumn,
} from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Category } from '../../categories/models/category.entity';
import { RemovingProtocol } from '../../protocols/models/protocols.entity';
import { AssetNote } from './assetNote.entity';

export enum AssetState {
  actual,
  removed,
}

@Entity()
export class Assets extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, nullable: true })
  name: string;

  @Column({})
  quantity: number;

  @Column({ length: 50, nullable: true })
  serialNumber: string;

  @Column({ length: 50, nullable: true })
  inventoryNumber: string;

  @Column({ length: 50, nullable: true })
  evidenceNumber: string;

  @Column({ length: 50, nullable: true })
  identificationNumber: string;

  @Column({ nullable: true })
  inquiryDate: Date;

  @Column({ length: 20, nullable: true })
  document: string;

  @Column({ length: 50, nullable: true })
  location: string;

  @Column({ length: 150, nullable: true })
  locationEtc: string;

  @Column({ length: 250, nullable: true })
  note: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  inquiryPrice: number;

  @ManyToOne((type) => User, (user) => user.id, {
    lazy: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  user: Promise<User>;
  @RelationId((asset: Assets) => asset.user)
  user_id: number;

  @ManyToOne((type) => Category, (category) => category.id, { lazy: true })
  category: Promise<Category>;
  @RelationId((asset: Assets) => asset.category)
  category_id: number;

  @Column({ default: AssetState.actual })
  state: AssetState;

  @ManyToOne(
    (type) => RemovingProtocol,
    (removingProtocol) => removingProtocol.id,
    { nullable: true },
  )
  removingProtocol: RemovingProtocol;

  @VersionColumn({ default: 1 })
  version: number;

  @OneToMany((type) => AssetNote, (assetNote) => assetNote.id, {
    cascade: true,
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'assetNotes',
    referencedColumnName: 'assetNoteId',
  })
  assetNotes: AssetNote[];

  //TODO: @ManyToOne(type => Locations )

  //TODO: uctovaci doklady
}
