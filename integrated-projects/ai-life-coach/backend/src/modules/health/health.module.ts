import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthRecord } from './entities/health-record.entity';
import { HygieneRecord } from './entities/hygiene-record.entity';
import { EmotionRecord } from './entities/emotion-record.entity';
import { DietRecord } from './entities/diet-record.entity';
import { SleepRecord } from './entities/sleep-record.entity';
import { IntimateRecord } from './entities/intimate-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    HealthRecord,
    HygieneRecord,
    EmotionRecord,
    DietRecord,
    SleepRecord,
    IntimateRecord,
  ])],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
