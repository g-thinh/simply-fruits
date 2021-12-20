import { ApiHideProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @ApiHideProperty()
  passwordHash: string;

  @Column({ nullable: true })
  @ApiHideProperty()
  hashedRefreshToken?: string;
}
