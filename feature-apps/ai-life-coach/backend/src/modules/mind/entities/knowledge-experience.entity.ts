import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('knowledge_experience')
export class KnowledgeExperience {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  recordType!: string;

  @Column({ type: 'text', nullable: true })
  gains?: string;

  @Column({ type: 'date' })
  recordDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
