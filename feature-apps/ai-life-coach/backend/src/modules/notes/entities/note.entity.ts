import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';

export enum NoteType {
  SUMMARY = 'summary',
  HIGHLIGHT = 'highlight',
  REFLECTION = 'reflection',
  PRACTICE = 'practice',
}

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  bookId: number;

  @Column({ type: 'date', nullable: true })
  noteDate: Date;

  @Column({ type: 'int', nullable: true })
  pageNumber: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 20, default: NoteType.REFLECTION })
  noteType: NoteType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  chapter: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tags: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  dimension: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Book, (book) => book.notes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
