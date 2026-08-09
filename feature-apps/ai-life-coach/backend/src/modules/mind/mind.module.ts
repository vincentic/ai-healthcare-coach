import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MindController } from './mind.controller';
import { MindService } from './mind.service';
import { HealingPractice } from './entities/healing-practice.entity';
import { GrowthPathRecord } from './entities/growth-path-record.entity';
import { KnowledgeExperience } from './entities/knowledge-experience.entity';
import { SynchronicityPractice } from './entities/synchronicity-practice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    HealingPractice,
    GrowthPathRecord,
    KnowledgeExperience,
    SynchronicityPractice,
  ])],
  controllers: [MindController],
  providers: [MindService],
  exports: [MindService],
})
export class MindModule {}
