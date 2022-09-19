import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Assets } from '../../assets/models/assets.entity';

@Entity()
export class RemovingProtocol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  document: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  documentDate: Date;

  @Column({ type: 'timestamp without time zone', nullable: false })
  possibleRemovingDate: Date;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created: Date;

  @ManyToOne((type) => User, (user) => user.id, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany((type) => Assets, (assets) => assets.removingProtocol)
  assets: Assets[];

  // @Column({default: AssetState.actual})
  // state: AssetState; printed or not?
}
