import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TimeRecord } from './entities/time-record.entity';

@Injectable()
export class TimeService {
  constructor(@InjectRepository(TimeRecord) private timeRepo: Repository<TimeRecord>) {}

  async create(data: Partial<TimeRecord>) {
    return this.timeRepo.save(this.timeRepo.create(data));
  }

  async findAll(startDate?: string, endDate?: string, category?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (startDate && endDate) {
      where.recordDate = Between(new Date(startDate), new Date(endDate));
    }
    return this.timeRepo.find({ where, order: { recordDate: 'DESC', createdAt: 'DESC' } });
  }

  async findByDate(date: string) {
    return this.timeRepo.find({
      where: { recordDate: new Date(date) },
      order: { createdAt: 'ASC' },
    });
  }

  async getTimeStats(startDate: string, endDate: string) {
    const records = await this.findAll(startDate, endDate);
    const byCategory = {};
    let totalMinutes = 0;
    records.forEach((r) => {
      byCategory[r.category || 'uncategorized'] = (byCategory[r.category || 'uncategorized'] || 0) + r.durationMinutes;
      totalMinutes += r.durationMinutes;
    });
    return { totalMinutes, byCategory, recordCount: records.length };
  }

  async delete(id: number) {
    await this.timeRepo.delete(id);
  }
}
