import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('intimate_records')
export class IntimateRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'date' })
  recordDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
