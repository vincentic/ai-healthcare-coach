import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Book, BookStatus } from '../books/entities/book.entity';
import { Note } from '../notes/entities/note.entity';
import { FinancialRecord, FinancialType } from '../financial/entities/financial-record.entity';
import { HealthRecord } from '../health/entities/health-record.entity';
import { TimeRecord } from '../time/entities/time-record.entity';
import { MindService } from '../mind/mind.service';
import { RelationshipsService } from '../relationships/relationships.service';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Note) private noteRepo: Repository<Note>,
    @InjectRepository(FinancialRecord) private financialRepo: Repository<FinancialRecord>,
    @InjectRepository(HealthRecord) private healthRepo: Repository<HealthRecord>,
    @InjectRepository(TimeRecord) private timeRepo: Repository<TimeRecord>,
    private mindService: MindService,
    private relationshipsService: RelationshipsService,
  ) {}

  async getGrowthStatistics() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const startOfYear = new Date(currentYear, 0, 1);

    const [
      totalBooks,
      finishedBooks,
      todoBooks,
      readingBooks,
      monthlyBooks,
      yearlyBooks,
      totalNotes,
      monthlyNotes,
      yearlyNotes,
    ] = await Promise.all([
      this.bookRepo.count(),
      this.bookRepo.count({ where: { status: BookStatus.FINISHED } }),
      this.bookRepo.count({ where: { status: BookStatus.TODO } }),
      this.bookRepo.count({ where: { status: BookStatus.READING } }),
      this.bookRepo.count({ where: { finishDate: Between(startOfMonth, now) } }),
      this.bookRepo.count({ where: { finishDate: Between(startOfYear, now) } }),
      this.noteRepo.count(),
      this.noteRepo.count({ where: { noteDate: Between(startOfMonth, now) } }),
      this.noteRepo.count({ where: { noteDate: Between(startOfYear, now) } }),
    ]);

    return {
      totalBooks,
      finishedBooks,
      todoBooks,
      readingBooks,
      monthlyBooks,
      yearlyBooks,
      totalNotes,
      monthlyNotes,
      yearlyNotes,
    };
  }

  async getFinancialStatistics(startDate: string, endDate: string) {
    const records = await this.financialRepo.find({
      where: { recordDate: Between(new Date(startDate), new Date(endDate)) },
    });

    const income = records
      .filter((r) => r.type === FinancialType.INCOME)
      .reduce((sum, r) => sum + Number(r.amount), 0);

    const expense = records
      .filter((r) => r.type === FinancialType.EXPENSE)
      .reduce((sum, r) => sum + Number(r.amount), 0);

    return { income, expense, balance: income - expense, recordCount: records.length };
  }

  async getHealthStatistics(startDate: string, endDate: string) {
    const records = await this.healthRepo.find({
      where: { recordDate: Between(new Date(startDate), new Date(endDate)) },
    });
    return { recordCount: records.length, records };
  }

  async getTimeStatistics(startDate: string, endDate: string) {
    const records = await this.timeRepo.find({
      where: { recordDate: Between(new Date(startDate), new Date(endDate)) },
    });
    const totalMinutes = records.reduce((sum, r) => sum + r.durationMinutes, 0);
    return { totalMinutes, recordCount: records.length };
  }

  async getAllStatistics(startDate: string, endDate: string) {
    const [growth, financial, health, time, mind, relationships] = await Promise.all([
      this.getGrowthStatistics(),
      this.getFinancialStatistics(startDate, endDate),
      this.getHealthStatistics(startDate, endDate),
      this.getTimeStatistics(startDate, endDate),
      this.mindService.getMindStats(startDate, endDate),
      this.relationshipsService.getRelationshipStats(startDate, endDate),
    ]);
    return { growth, financial, health, time, mind, relationships };
  }
}
