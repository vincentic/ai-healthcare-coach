import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { DailyReview } from './entities/daily-review.entity';

@Injectable()
export class DailyReviewsService {
  constructor(
    @InjectRepository(DailyReview)
    private readonly dailyReviewRepository: Repository<DailyReview>,
  ) {}

  async createOrUpdate(date: string, data: Partial<DailyReview>) {
    const reviewDate = new Date(date);
    const existing = await this.dailyReviewRepository.findOne({ where: { reviewDate } });

    if (existing) {
      await this.dailyReviewRepository.update(existing.id, data);
      return this.dailyReviewRepository.findOne({ where: { id: existing.id } });
    }

    return this.dailyReviewRepository.save(
      this.dailyReviewRepository.create({ ...data, reviewDate }),
    );
  }

  async findByDate(date: string) {
    return this.dailyReviewRepository.findOne({ where: { reviewDate: new Date(date) } });
  }

  async findAll(startDate?: string, endDate?: string) {
    const where: any = {};
    if (startDate && endDate) {
      where.reviewDate = Between(new Date(startDate), new Date(endDate));
    }

    return this.dailyReviewRepository.find({
      where,
      order: { reviewDate: 'DESC', updatedAt: 'DESC' },
    });
  }

  async delete(id: number) {
    await this.dailyReviewRepository.delete(id);
  }
}
