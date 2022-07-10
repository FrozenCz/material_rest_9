import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  VersionColumn,
} from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';

/**
 * entity reprezentujici kategorie ve kterych je zarazen majetek
 */
@Entity()
@Tree('closure-table')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @Column({ nullable: true })
  @MaxLength(20)
  code: string;

  @TreeChildren({ cascade: true })
  children: Category[];

  @TreeParent()
  parent: Category;

  @VersionColumn({ default: 1 })
  version: number;
}
