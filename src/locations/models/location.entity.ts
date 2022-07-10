import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent, VersionColumn
} from "typeorm";
import {Unit} from '../../units/unit.entity';


@Entity()
@Tree('closure-table')
export class Location extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @TreeChildren()
    children: Location[]

    @TreeParent()
    parent: Location

    // @OneToMany(type => Assets, assets => assets.location)
    // assets: Assets[]

    @ManyToOne(type => Unit, unit => unit.id, {eager: true})
    masterUnit: Unit //unit without parent

    @VersionColumn({default: 1})
    version: number;

}
