import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Book } from '../books/entities/book.entity';
import { Note } from '../notes/entities/note.entity';
import { FinancialRecord } from '../financial/entities/financial-record.entity';
import { HealthRecord } from '../health/entities/health-record.entity';
import { TimeRecord } from '../time/entities/time-record.entity';
import { MindModule } from '../mind/mind.module';
import { RelationshipsModule } from '../relationships/relationships.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Note, FinancialRecord, HealthRecord, TimeRecord]),
    MindModule,
    RelationshipsModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
