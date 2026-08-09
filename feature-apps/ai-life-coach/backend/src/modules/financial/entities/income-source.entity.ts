import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum IncomeSourceType {
  SALARY = 'salary',
  BONUS = 'bonus',
  SIDE_JOB = 'side_job',
  INVESTMENT = 'investment',
  OTHER = 'other',
}

@Entity('income_sources')
export class IncomeSource {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  sourceType: IncomeSourceType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sourceName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'date' })
  incomeDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  sourceUnit: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
