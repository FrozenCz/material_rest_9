import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import { User } from "../../users/models/user.entity";
import { Assets } from "./assets.entity";
import { StockTakingItemEntity } from "./stock-taking-item.entity";
import { AssetAttachmentsEntity } from "./assets-attachment.entity";


@Entity('stock_taking')
export class StockTakingEntity extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.id, {lazy: true, nullable: true})
  solver: Promise<User>
  @Column({nullable: true})
  @RelationId((stockTakingEntity: StockTakingEntity) => stockTakingEntity.solver)
  solverId: number

  @ManyToOne(() => User, user => user.id, {lazy: true, nullable: true})
  author: Promise<User>
  @Column({nullable: true})
  @RelationId((stockTakingEntity: StockTakingEntity) => stockTakingEntity.author)
  authorId: number

  @OneToMany(
    () => StockTakingItemEntity,
    (stockTakingItemEntity) => stockTakingItemEntity.stockTaking,
    {
      eager: true,
      cascade: true,
    },
  )
  items: StockTakingItemEntity[]

  @CreateDateColumn({type: 'timestamp without time zone'})
  createdAt: Date

  @Column({type: 'timestamp without time zone', nullable: true})
  closedAt: Date | null


}
