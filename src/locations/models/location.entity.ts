import {
  BaseEntity,
  Column,
  Entity, Generated,
  ManyToOne,
  PrimaryGeneratedColumn, RelationId,
  Tree,
  TreeChildren,
  TreeParent,
  VersionColumn
} from "typeorm";
import { Unit } from '../../units/unit.entity';

@Entity()
@Tree('closure-table')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  @Generated()
  ord: number;

  @Column({ nullable: true })
  nfcId: string;

  @Column()
  name: string;

  @TreeChildren()
  children: Location[];

  @TreeParent()
  parent: Location;
  @RelationId((loc: Location) => loc.parent)
  parent_uuid: string;

  // @OneToMany(type => Assets, assets => assets.location)
  // assets: Assets[]

  @ManyToOne((type) => Unit, (unit) => unit.id, { eager: true })
  masterUnit: Unit; //unit without parent

  @VersionColumn({ default: 1 })
  version: number;
}
