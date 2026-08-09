import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum HygieneType {
  HAIR_CARE = 'hair_care',     // 护发
  EYE_CARE = 'eye_care',        // 护眼
  BODY_CARE = 'body_care',      // 护体
  DENTAL = 'dental',            // 护齿
  SHAVE = 'shave',              // 护须
  HEART = 'heart',              // 护心
  HOME = 'home',                // 护所
}

@Entity('hygiene_records')
export class HygieneRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  hygieneType!: HygieneType;

  @Column({ type: 'date' })
  recordDate!: Date;

  @Column({ type: 'text', nullable: true })
  gains?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
