import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('daily_reviews')
export class DailyReview {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'date', unique: true })
  reviewDate: Date;

  @Column({ type: 'text', nullable: true })
  contactReview: string;

  @Column({ type: 'text', nullable: true })
  sleepReview: string;

  @Column({ type: 'text', nullable: true })
  dietReview: string;

  @Column({ type: 'text', nullable: true })
  accountReview: string;

  @Column({ type: 'text', nullable: true })
  cleaningReview: string;

  @Column({ type: 'text', nullable: true })
  emotionReview: string;

  @Column({ type: 'text', nullable: true })
  exerciseReview: string;

  @Column({ type: 'text', nullable: true })
  timeReview: string;

  @Column({ type: 'text', nullable: true })
  bodyReview: string;

  @Column({ type: 'text', nullable: true })
  readingReview: string;

  @Column({ type: 'text', nullable: true })
  inputReview: string;

  @Column({ type: 'text', nullable: true })
  outputReview: string;

  @Column({ type: 'text', nullable: true })
  newKnowledgeReview: string;

  @Column({ type: 'text', nullable: true })
  dreamReview: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'text', nullable: true })
  nextAction: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
