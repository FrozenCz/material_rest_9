import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Assets } from "./assets.entity";
import { StockTakingEntity } from "./stock-taking.entity";
import { Location } from "../../locations/models/location.entity";


@Entity('stock_taking_item')
export class StockTakingItemEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @ManyToOne(() => Assets, asset => asset.id, {lazy: true, nullable: true})
  asset: Promise<Assets>
  @Column({nullable: true})
  @RelationId((stockTakingItemEntity: StockTakingItemEntity) => stockTakingItemEntity.asset)
  assetId: number

  @ManyToOne(() => StockTakingEntity, stockTaking => stockTaking.uuid, {lazy: true, nullable: true})
  stockTaking: Promise<StockTakingEntity>
  @RelationId((stockTakingItemEntity: StockTakingItemEntity) => stockTakingItemEntity.stockTaking)
  stockTakingUuid: string

  @ManyToOne(() => Location, location => location.uuid, {lazy: true, nullable: true})
  foundInLocation: Promise<Location>
  @Column({nullable: true})
  @RelationId((stockTakingItemEntity: StockTakingItemEntity) => stockTakingItemEntity.foundInLocation)
  foundInLocationUuid: string

  @Column({type: 'timestamp without time zone', nullable: true})
  foundAt: Date | null

  @Column({nullable: true})
  note: string


}
