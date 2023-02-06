import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RightsCategoryEnum, RightsTag } from '../config/rights.list';

@Entity()
export class Rights extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tag: RightsTag;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column()
  relatedTo: RightsCategoryEnum;

  // @ManyToMany(type=> User, {cascade: true})
  // @JoinTable({
  //   name: 'users_rights',
  //   joinColumn: {name: 'rights_id', referencedColumnName: 'id'},
  //   inverseJoinColumn: {name: 'user_id', referencedColumnName: 'id'}
  // })
  // users: User[]
}
