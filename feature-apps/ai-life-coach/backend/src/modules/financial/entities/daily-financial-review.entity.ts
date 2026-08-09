import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('daily_financial_review')
export class DailyFinancialReview {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'date', unique: true })
  reviewDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalIncome: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalExpense: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  balanceRate: number;

  @Column({ type: 'text', nullable: true })
  reflection: string;

  @Column({ type: 'text', nullable: true })
  improvementPlan: string;

  @CreateDateColumn()
  createdAt: Date;
}
