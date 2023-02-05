import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Assets } from './assets.entity';

@Entity()
export class AssetNote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updated: Date;

  @Column({ length: 5000 })
  text: string;

  @ManyToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'userNoteId' })
  user: User;

  @Column({ default: false })
  deleted: boolean;

  @ManyToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'deletedByUserId' })
  deletedByUser: User;

  @ManyToOne((type) => Assets, (asset) => asset.id)
  @JoinColumn()
  asset: Assets;
}
