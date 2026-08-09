import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { RelationshipRecord, RelationshipCategory } from './entities/relationship-record.entity';

@Injectable()
export class RelationshipsService {
  constructor(@InjectRepository(RelationshipRecord) private repo: Repository<RelationshipRecord>) {}

  async create(data: Partial<RelationshipRecord>) {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(category?: RelationshipCategory, startDate?: string, endDate?: string) {
    const where: any = {};
    if (category) where.category = category;
    if (startDate && endDate) {
      where.recordDate = Between(new Date(startDate), new Date(endDate));
    }
    return this.repo.find({ where, order: { recordDate: 'DESC' } });
  }

  async findByPerson(personName: string) {
    return this.repo.find({
      where: { personName },
      order: { recordDate: 'DESC' },
    });
  }

  async getRelationshipStats(startDate: string, endDate: string) {
    const records = await this.findAll(undefined, startDate, endDate);
    const byCategory = {};
    records.forEach((r) => {
      byCategory[r.category || 'uncategorized'] = (byCategory[r.category || 'uncategorized'] || 0) + 1;
    });
    return { totalRecords: records.length, byCategory };
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }
}
