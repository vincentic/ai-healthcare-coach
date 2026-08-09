import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { WorkLog } from './entities/work-log.entity';

@Injectable()
export class WorkLogsService {
  constructor(@InjectRepository(WorkLog) private workLogRepo: Repository<WorkLog>) {}

  async create(data: Partial<WorkLog>) {
    return this.workLogRepo.save(this.workLogRepo.create(data));
  }

  async findAll(module?: string, startDate?: string, endDate?: string) {
    const where: any = {};
    if (module) where.module = module;
    if (startDate && endDate) {
      where.recordDate = Between(new Date(startDate), new Date(endDate));
    }
    return this.workLogRepo.find({ where, order: { recordDate: 'DESC', createdAt: 'DESC' } });
  }

  async getStats(startDate?: string, endDate?: string) {
    const records = await this.findAll(undefined, startDate, endDate);
    const byModule: Record<string, { count: number; totalDelta: number; latestProgress: number; latestDate: Date }> = {};

    records.forEach((record) => {
      const moduleName = record.module || '未分类';
      const delta = (record.progressAfter || 0) - (record.progressBefore || 0);
      const current = byModule[moduleName];

      if (!current) {
        byModule[moduleName] = {
          count: 1,
          totalDelta: delta,
          latestProgress: record.progressAfter || 0,
          latestDate: record.recordDate,
        };
        return;
      }

      current.count += 1;
      current.totalDelta += delta;
      if (new Date(record.recordDate) > new Date(current.latestDate)) {
        current.latestProgress = record.progressAfter || 0;
        current.latestDate = record.recordDate;
      }
    });

    const totalDelta = records.reduce(
      (sum, record) => sum + ((record.progressAfter || 0) - (record.progressBefore || 0)),
      0,
    );

    return {
      recordCount: records.length,
      totalDelta,
      byModule,
    };
  }

  async delete(id: number) {
    await this.workLogRepo.delete(id);
  }
}
