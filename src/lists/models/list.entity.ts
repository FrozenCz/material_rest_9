import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    JoinColumn, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import {Assets} from '../../assets/models/assets.entity';
import {User} from '../../users/models/user.entity';

@Entity()
export class ListEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    category: string;

    @Column()
    connected: boolean;

    @Column()
    archived: boolean;

    @Column({nullable: true})
    description: string;

    @CreateDateColumn({type: 'timestamp without time zone'})
    created: Date;

    @UpdateDateColumn({type: 'timestamp without time zone'})
    updated: Date;

    @ManyToMany(type => Assets, object => object.user,{onDelete: 'CASCADE'})
    @JoinTable({
        name: 'assets_for_list',
        joinColumns: [{ name: 'userId' }],
        inverseJoinColumns: [{ name: 'assetId' }],
    })
    assets: Assets[]

    @ManyToOne(type => User, user => user.id, {eager: true})
    @JoinColumn()
    user: User


}


