import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum PathType {
  INNER_FIRST = 'inner_first',
  OUTER_FIRST = 'outer_first',
  SYNC = 'sync',
}

export enum GrowthPathStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ABANDONED = 'abandoned',
}

@Entity('growth_path_records')
export class GrowthPathRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  pathType: PathType;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 20, default: GrowthPathStatus.IN_PROGRESS })
  status: GrowthPathStatus;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
