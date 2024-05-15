import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  text: string;

  @Column()
  status: number;

  @Column('user_id')
  userId: number;

  @Column('room_id')
  roomId: number;

  @Column('created_at')
  createdAt: Date;

  @Column('updated_at')
  updatedAt: Date;
}
