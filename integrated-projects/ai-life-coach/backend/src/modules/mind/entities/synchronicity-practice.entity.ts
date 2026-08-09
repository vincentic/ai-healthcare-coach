import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum PracticeType {
  FLOW = 'flow',
  MEDITATION = 'meditation',
  YOGA = 'yoga',
  TAO = 'tao',
}

@Entity('synchronicity_practice')
export class SynchronicityPractice {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  practiceType: PracticeType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int', nullable: true })
  durationMinutes: number;

  @Column({ type: 'text', nullable: true })
  stateDescription: string;

  @Column({ type: 'int', nullable: true })
  balanceLevel: number;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
