import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, VersionColumn} from 'typeorm';
import {IsJSON, IsString, MaxLength, MinLength} from 'class-validator';

@Entity()
export class CategorySettings extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @Column()
    @IsJSON()
    config: string;

    @VersionColumn({default: 1})
    version: number;
}
