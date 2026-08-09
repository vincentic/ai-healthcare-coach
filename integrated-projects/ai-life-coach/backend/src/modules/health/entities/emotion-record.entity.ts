import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('emotion_records')
export class EmotionRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  triggerEvent: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  emotionType: string;

  @Column({ type: 'int', nullable: true })
  emotionLevel: number;

  @Column({ type: 'text', nullable: true })
  innerNeeds: string;

  @Column({ type: 'text', nullable: true })
  reflection: string;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
