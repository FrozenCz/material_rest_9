import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from '../users/models/user.entity';
import {IsJSON} from 'class-validator';
import {HistoryRelatedTo} from './models/history.model';
import {Assets} from '../assets/models/assets.entity';

@Entity()
export class History extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id,
        {eager: true, cascade: true, onUpdate: 'CASCADE'})
    @JoinColumn({
        name: 'changedByUserId'
    })
    changedBy: User;

    @Column()
    relatedTo: HistoryRelatedTo;

    @Column()
    @IsJSON()
    changedFrom: string;

    @Column()
    @IsJSON()
    changedTo: string;

    @CreateDateColumn({type: 'timestamp without time zone'})
    created: Date;

    @ManyToOne(type => User, user => user.id, {nullable: true, eager: true})
    @JoinColumn({name: 'userId'})
    user: User

    @ManyToOne(type => Assets, asset => asset.id, {nullable: true, eager: true})
    @JoinColumn({name: 'assetId'})
    asset: Assets

}
