import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'messages' })
export class MessageEntitiy {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
