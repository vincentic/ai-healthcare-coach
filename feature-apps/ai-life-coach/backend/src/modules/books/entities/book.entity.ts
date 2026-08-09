import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BookDimensionLink } from './book-dimension-link.entity';
import { Note } from '../../notes/entities/note.entity';

export enum BookStatus {
  TODO = 'todo',
  READING = 'reading',
  FINISHED = 'finished',
}

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  author?: string;

  @Column({ type: 'date', nullable: true })
  startDate?: Date | null;

  @Column({ type: 'date', nullable: true })
  finishDate?: Date | null;

  @Column({ type: 'date', nullable: true })
  estimatedFinishDate?: Date | null;

  @Column({ type: 'varchar', length: 20, default: BookStatus.TODO })
  status!: BookStatus;

  @Column({ type: 'varchar', length: 20, nullable: true })
  dimension?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => BookDimensionLink, (link) => link.book)
  dimensionLinks!: BookDimensionLink[];

  @OneToMany(() => Note, (note) => note.book)
  notes!: Note[];
}
