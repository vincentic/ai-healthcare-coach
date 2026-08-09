import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialController } from './financial.controller';
import { FinancialService } from './financial.service';
import { FinancialRecord } from './entities/financial-record.entity';
import { IncomeSource } from './entities/income-source.entity';
import { ExpenseAnalysis } from './entities/expense-analysis.entity';
import { CareerPlanning } from './entities/career-planning.entity';
import { DailyFinancialReview } from './entities/daily-financial-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    FinancialRecord,
    IncomeSource,
    ExpenseAnalysis,
    CareerPlanning,
    DailyFinancialReview,
  ])],
  controllers: [FinancialController],
  providers: [FinancialService],
  exports: [FinancialService],
})
export class FinancialModule {}
