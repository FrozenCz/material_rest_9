import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rights } from './rights.entity';
import { Unit } from '../../units/unit.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  surname: string;

  @Column({ length: 100, select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @ManyToMany(() => Rights, { cascade: true, eager: true })
  @JoinTable({
    name: 'users_rights',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rights_id', referencedColumnName: 'id' },
  })
  rights: Rights[];

  @ManyToOne((type) => Unit, (unit) => unit.id, { eager: true, cascade: false })
  unit: Unit;

  @Column({ select: false, default: true })
  active: boolean;

  @VersionColumn({ default: 1 })
  version: number;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
