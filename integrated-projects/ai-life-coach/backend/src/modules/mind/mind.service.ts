import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { HealingPractice } from './entities/healing-practice.entity';
import { GrowthPathRecord, GrowthPathStatus } from './entities/growth-path-record.entity';
import { KnowledgeExperience } from './entities/knowledge-experience.entity';
import { SynchronicityPractice, PracticeType } from './entities/synchronicity-practice.entity';

@Injectable()
export class MindService {
  constructor(
    @InjectRepository(HealingPractice) private healingRepo: Repository<HealingPractice>,
    @InjectRepository(GrowthPathRecord) private pathRepo: Repository<GrowthPathRecord>,
    @InjectRepository(KnowledgeExperience) private knowledgeRepo: Repository<KnowledgeExperience>,
    @InjectRepository(SynchronicityPractice) private synchRepo: Repository<SynchronicityPractice>,
  ) {}

  // Healing Practice
  async createHealing(data: Partial<HealingPractice>) {
    return this.healingRepo.save(this.healingRepo.create(data));
  }

  async findHealing(healingType?: string, bookId?: number) {
    const where: any = {};
    if (healingType) where.healingType = healingType;
    if (bookId) where.bookId = bookId;
    return this.healingRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  async findHealingByDate(startDate: string, endDate: string) {
    return this.healingRepo.find({
      where: { recordDate: Between(new Date(startDate), new Date(endDate)) },
      order: { recordDate: 'DESC' },
    });
  }

  // Growth Path
  async createPath(data: Partial<GrowthPathRecord>) {
    return this.pathRepo.save(this.pathRepo.create(data));
  }

  async findPaths(status?: string) {
    const where = status ? { status: status as GrowthPathStatus } : {};
    return this.pathRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Knowledge Experience
  async createKnowledge(data: Partial<KnowledgeExperience>) {
    return this.knowledgeRepo.save(this.knowledgeRepo.create(data));
  }

  async findKnowledge(recordType?: string, bookId?: number) {
    const where: any = {};
    if (recordType) where.recordType = recordType;
    if (bookId) where.bookId = bookId;
    return this.knowledgeRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Synchronicity Practice
  async createSynchronicity(data: Partial<SynchronicityPractice>) {
    return this.synchRepo.save(this.synchRepo.create(data));
  }

  async findSynchronicity(practiceType?: string) {
    const where = practiceType ? { practiceType: practiceType as PracticeType } : {};
    return this.synchRepo.find({ where, order: { recordDate: 'DESC' } });
  }

  // Mind Stats
  async getMindStats(startDate: string, endDate: string) {
    const [healing, knowledge, synchronicity] = await Promise.all([
      this.findHealingByDate(startDate, endDate),
      this.knowledgeRepo.find({ where: { recordDate: Between(new Date(startDate), new Date(endDate)) } }),
      this.synchRepo.find({ where: { recordDate: Between(new Date(startDate), new Date(endDate)) } }),
    ]);
    return {
      healingCount: healing.length,
      knowledgeCount: knowledge.length,
      synchronicityCount: synchronicity.length,
      healingByType: healing.reduce((acc, h) => { acc[h.healingType] = (acc[h.healingType] || 0) + 1; return acc; }, {}),
    };
  }
}
