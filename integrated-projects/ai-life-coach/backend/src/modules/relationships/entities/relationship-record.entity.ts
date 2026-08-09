import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum RelationshipCategory {
  NATURAL = 'natural',
  SOCIAL = 'social',
  FAMILY = 'family',
  FRIENDS = 'friends',
  COLLEAGUES = 'colleagues',
}

@Entity('relationship_records')
export class RelationshipRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  personName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  interactionType: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: RelationshipCategory;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
