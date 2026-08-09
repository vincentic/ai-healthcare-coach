import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('sleep_records')
export class SleepRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'time' })
  sleepTime: string;

  @Column({ type: 'time' })
  wakeTime: string;

  @Column({ type: 'int', nullable: true })
  sleepDuration: number;

  @Column({ type: 'int', nullable: true })
  fallAsleepDuration: number;

  @Column({ type: 'int', default: 0 })
  nightWakeCount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sleepDisturbance: string;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
