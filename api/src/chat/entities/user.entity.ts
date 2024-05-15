import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column()
  image: string;

  @Column('created_at')
  createdAt: Date;

  @Column('updated_at')
  updatedAt: Date;
}
