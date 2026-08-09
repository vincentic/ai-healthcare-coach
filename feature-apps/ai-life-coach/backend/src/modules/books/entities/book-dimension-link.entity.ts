import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './book.entity';

export enum Dimension {
  FINANCIAL = 'financial',
  HEALTH = 'health',
  TIME = 'time',
  MIND = 'mind',
  RELATIONSHIPS = 'relationships',
}

@Entity('book_dimension_links')
export class BookDimensionLink {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'bigint' })
  bookId!: number;

  @Column({ type: 'varchar', length: 20 })
  dimension!: Dimension;

  @Column({ type: 'int', default: 3 })
  impactLevel!: number;

  @Column({ type: 'text', nullable: true })
  impactDescription?: string;

  @Column({ type: 'text', nullable: true })
  appliedAction?: string;

  @Column({ type: 'text', nullable: true })
  changeResult?: string;

  @Column({ type: 'text', nullable: true })
  readingGains?: string;

  @Column({ type: 'date' })
  recordDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Book, (book) => book.dimensionLinks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book!: Book;
}
