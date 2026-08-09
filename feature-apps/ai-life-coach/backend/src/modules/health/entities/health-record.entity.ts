import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum HealthRecordType {
  HEALTH = 'health',
  EXERCISE = 'exercise',
}

export enum ExerciseType {
  STRENGTH = 'strength',       // 力量训练
  CARDIO = 'cardio',           // 有氧运动
  FLEXIBILITY = 'flexibility', // 柔韧性
  BALANCE = 'balance',         // 平衡训练
  SPORTS = 'sports',           // 球类运动
  OTHER = 'other',             // 其他
}

@Entity('health_records')
export class HealthRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 20, default: HealthRecordType.HEALTH })
  recordType!: HealthRecordType;

  // Health record fields
  @Column({ type: 'varchar', length: 100, nullable: true })
  person?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  // Exercise record fields
  @Column({ type: 'varchar', length: 20, nullable: true })
  exerciseType?: ExerciseType;

  @Column({ type: 'text', nullable: true })
  gains?: string;

  @Column({ type: 'date' })
  recordDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
