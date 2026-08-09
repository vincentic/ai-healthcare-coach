import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { FinancialRecord } from './entities/financial-record.entity';
import { IncomeSource } from './entities/income-source.entity';
import { ExpenseAnalysis } from './entities/expense-analysis.entity';
import { CareerPlanning, PlanStatus } from './entities/career-planning.entity';
import { DailyFinancialReview } from './entities/daily-financial-review.entity';

@Injectable()
export class FinancialService {
  constructor(
    @InjectRepository(FinancialRecord)
    private financialRepository: Repository<FinancialRecord>,
    @InjectRepository(IncomeSource)
    private incomeRepository: Repository<IncomeSource>,
    @InjectRepository(ExpenseAnalysis)
    private expenseRepository: Repository<ExpenseAnalysis>,
    @InjectRepository(CareerPlanning)
    private careerRepository: Repository<CareerPlanning>,
    @InjectRepository(DailyFinancialReview)
    private reviewRepository: Repository<DailyFinancialReview>,
  ) {}

  // Financial Records
  async createFinancialRecord(data: Partial<FinancialRecord>) {
    return this.financialRepository.save(this.financialRepository.create(data));
  }

  async findFinancialRecords(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['recordDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.financialRepository.find({ where, order: { recordDate: 'DESC' } });
  }

  // Income Sources
  async createIncomeSource(data: Partial<IncomeSource>) {
    return this.incomeRepository.save(this.incomeRepository.create(data));
  }

  async findIncomeSources(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['incomeDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.incomeRepository.find({ where, order: { incomeDate: 'DESC' } });
  }

  // Expense Analysis
  async createExpense(data: Partial<ExpenseAnalysis>) {
    if (data.amount && data.threshold && data.amount > data.threshold) {
      data.isLargeExpense = true;
    }
    return this.expenseRepository.save(this.expenseRepository.create(data));
  }

  async findExpenses(startDate?: string, endDate?: string) {
    const where = {};
    if (startDate && endDate) {
      where['expenseDate'] = Between(new Date(startDate), new Date(endDate));
    }
    return this.expenseRepository.find({ where, order: { expenseDate: 'DESC' } });
  }

  async getExpenseStats(startDate: string, endDate: string) {
    const expenses = await this.findExpenses(startDate, endDate);
    const byType = {};
    expenses.forEach((e) => {
      byType[e.expenseType] = (byType[e.expenseType] || 0) + Number(e.amount);
    });
    return { total: expenses.reduce((sum, e) => sum + Number(e.amount), 0), byType };
  }

  // Career Planning
  async createCareer(data: Partial<CareerPlanning>) {
    return this.careerRepository.save(this.careerRepository.create(data));
  }

  async findCareerPlans(status?: string) {
    const where = status ? { status: status as PlanStatus } : {};
    return this.careerRepository.find({ where, order: { createdAt: 'DESC' } });
  }

  async updateCareerProgress(id: number, progress: number) {
    await this.careerRepository.update(id, { progress });
    return this.careerRepository.findOne({ where: { id } });
  }

  // Daily Financial Review
  async createOrUpdateReview(date: string, data: Partial<DailyFinancialReview>) {
    const existing = await this.reviewRepository.findOne({ where: { reviewDate: new Date(date) } });
    if (existing) {
      await this.reviewRepository.update(existing.id, data);
      return this.reviewRepository.findOne({ where: { id: existing.id } });
    }
    return this.reviewRepository.save(this.reviewRepository.create({ ...data, reviewDate: new Date(date) }));
  }

  async getDailyReview(date: string) {
    return this.reviewRepository.findOne({ where: { reviewDate: new Date(date) } });
  }

  async getMonthlyReview(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const reviews = await this.reviewRepository.find({
      where: { reviewDate: Between(startDate, endDate) },
    });
    const income = reviews.reduce((sum, r) => sum + Number(r.totalIncome), 0);
    const expense = reviews.reduce((sum, r) => sum + Number(r.totalExpense), 0);
    return { income, expense, balance: income - expense, dailyReviews: reviews };
  }
}
