import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

export enum HealingType {
  CBT = 'cbt',
  DBT = 'dbt',
  EFT = 'eft',
  EMDR = 'emdr',
  FELDENKRAIS = 'feldenkrais',
  SATIR = 'satir',
  JUNG = 'jung',
  PSYCHODRAMA = 'psychodrama',
  PHIL_STUTZ = 'phil_stutz',
  OTHER = 'other',
}

@Entity('healing_practice')
export class HealingPractice {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', nullable: true })
  bookId: number;

  @Column({ type: 'varchar', length: 50 })
  healingType: HealingType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  technique: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'int', nullable: true })
  durationMinutes: number;

  @Column({ type: 'int', default: 0 })
  progress: number;

  @Column({ type: 'text', nullable: true })
  feeling: string;

  @Column({ type: 'text', nullable: true })
  insight: string;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Book, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
