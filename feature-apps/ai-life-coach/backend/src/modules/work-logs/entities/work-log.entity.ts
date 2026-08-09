import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('work_logs')
export class WorkLog {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  module: string;

  @Column({ type: 'int', default: 0 })
  progressBefore: number;

  @Column({ type: 'int', default: 0 })
  progressAfter: number;

  @Column({ type: 'varchar', length: 50, default: '进行中' })
  status: string;

  @Column({ type: 'int', nullable: true })
  energyLevel: number;

  @Column({ type: 'text' })
  changeSummary: string;

  @Column({ type: 'text', nullable: true })
  nextStep: string;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
