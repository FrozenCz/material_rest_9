import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
  VersionColumn,
} from 'typeorm';
import { User } from '../users/models/user.entity';

@Entity()
@Tree('closure-table')
@Unique(['name'])
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Unit[];

  @TreeParent()
  parent: Unit;

  @ManyToMany((type) => User, { cascade: false })
  @JoinTable({
    name: 'units_users',
    joinColumn: { name: 'unit_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @VersionColumn({ default: 1 })
  version: number;
}
