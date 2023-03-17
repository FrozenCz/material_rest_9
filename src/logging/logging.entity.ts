import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RequestMethod } from "@nestjs/common";



@Entity('logging')
export class LoggingEntity extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  method: string

  @Column()
  url: string

  @Column()
  type: 'log' | 'error'

  @Column({nullable: true, type: 'jsonb'})
  body: JSON

  @Column({nullable: true, type: 'jsonb'})
  result: JSON

  @Column()
  time_ms: number

  @Column({nullable: true})
  username: string | null

  @CreateDateColumn({type: 'timestamp without time zone'})
  createdAt: Date

}
