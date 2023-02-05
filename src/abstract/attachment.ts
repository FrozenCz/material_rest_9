import {
  BaseEntity,
  Column,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../users/models/user.entity';

export abstract class Attachment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  attachment_id: string;

  @Column()
  filename: string;

  @Column({ type: 'bytea', select: false })
  binaryData: Buffer;

  @ManyToOne(() => User, (user) => user.id, { lazy: true })
  uploadedBy: Promise<User>;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp without time zone' })
  deletedAt: Date;
}
