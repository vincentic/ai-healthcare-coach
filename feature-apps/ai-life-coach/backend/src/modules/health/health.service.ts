import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { HealthRecord } from './entities/health-record.entity';
import { HygieneRecord, HygieneType } from './entities/hygiene-record.entity';
import { EmotionRecord } from './entities/emotion-record.entity';
import { DietRecord } from './entities/diet-record.entity';
import { SleepRecord } from './entities/sleep-record.entity';
import { IntimateRecord } from './entities/intimate-record.entity';

@Injectable()
export class HealthService {
  constructor(
    @InjectRepository(HealthRecord) private healthRepo: Repository<HealthRecord>,
    @InjectRepository(HygieneRecord) private hygieneRepo: Repository<HygieneRecord>,
    @InjectRepository(EmotionRecord) private emotionRepo: Repository<EmotionRecord>,
    @InjectRepository(DietRecord) private dietRepo: Repository<DietRecord>,
    @InjectRepository(SleepRecord) private sleepRepo: Repository<SleepRecord>,
    @InjectRepository(IntimateRecord) private intimateRepo: Repository<IntimateRecord>,
  ) {}

  // Health Records
  async createHealthRecord(data: Partial<HealthRecord>) {
    return this.healthRepo.save(this.healthRepo.create(data));
  }

  async findHealthRecords(recordType?: string, startDate?: string, endDate?: string) {
    const where: any = {};
    if (recordType) where.recordType = recordType;
    if (startDate && endDate) {
      where.recordDate = Between(new Date(startDate), new Date(endDate));
    }
    return this.healthRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Hygiene Records
  async createHygiene(data: Partial<HygieneRecord>) {
    return this.hygieneRepo.save(this.hygieneRepo.create(data));
  }

  async findHygieneRecords(hygieneType?: string) {
    const where = hygieneType ? { hygieneType: hygieneType as HygieneType } : {};
    return this.hygieneRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Emotion Records
  async createEmotion(data: Partial<EmotionRecord>) {
    return this.emotionRepo.save(this.emotionRepo.create(data));
  }

  async findEmotions(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['recordDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.emotionRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Diet Records
  async createDiet(data: Partial<DietRecord>) {
    return this.dietRepo.save(this.dietRepo.create(data));
  }

  async findDietRecords(startDate?: string) {
    const where = startDate ? { recordDate: new Date(startDate) } : {};
    return this.dietRepo.find({ where, order: { mealTime: 'ASC' } });
  }

  // Sleep Records
  async createSleep(data: Partial<SleepRecord>) {
    return this.sleepRepo.save(this.sleepRepo.create(data));
  }

  async findSleepRecords(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['recordDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.sleepRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Intimate Records
  async createIntimate(data: Partial<IntimateRecord>) {
    return this.intimateRepo.save(this.intimateRepo.create(data));
  }

  async findIntimateRecords(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['recordDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.intimateRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Health Statistics
  async getHealthStats(startDate: string, endDate: string) {
    const [health, sleep, diet] = await Promise.all([
      this.findHealthRecords(undefined, startDate, endDate),
      this.findSleepRecords(startDate, endDate),
      this.findDietRecords(startDate),
    ]);
    return { health, sleep, diet };
  }
}
