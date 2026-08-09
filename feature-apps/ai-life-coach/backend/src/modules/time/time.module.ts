import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';
import { TimeRecord } from './entities/time-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeRecord])],
  controllers: [TimeController],
  providers: [TimeService],
  exports: [TimeService],
})
export class TimeModule {}
