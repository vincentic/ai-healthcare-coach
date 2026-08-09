import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ExpenseType {
  DINING = 'dining',
  TRANSPORT = 'transport',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  HOUSING = 'housing',
  MEDICAL = 'medical',
  EDUCATION = 'education',
  OTHER = 'other',
}

@Entity('expense_analysis')
export class ExpenseAnalysis {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  expenseType: ExpenseType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  threshold: number;

  @Column({ type: 'tinyint', default: 0 })
  isLargeExpense: boolean;

  @Column({ type: 'date' })
  expenseDate: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
