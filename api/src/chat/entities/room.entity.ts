import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  status: number;

  @Column('user_id')
  userId: number;

  @Column('created_at')
  createdAt: Date;

  @Column('updated_at')
  updatedAt: Date;
}
