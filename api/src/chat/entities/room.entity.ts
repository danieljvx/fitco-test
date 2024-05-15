import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
