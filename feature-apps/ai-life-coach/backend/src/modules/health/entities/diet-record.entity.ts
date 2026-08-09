import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
}

@Entity('diet_records')
export class DietRecord {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20 })
  mealType: MealType;

  @Column({ type: 'time' })
  mealTime: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  foodContent: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  foodCategory: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cost: number;

  @Column({ type: 'date' })
  recordDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
