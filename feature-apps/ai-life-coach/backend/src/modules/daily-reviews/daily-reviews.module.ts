import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReviewsController } from './daily-reviews.controller';
import { DailyReviewsService } from './daily-reviews.service';
import { DailyReview } from './entities/daily-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyReview])],
  controllers: [DailyReviewsController],
  providers: [DailyReviewsService],
  exports: [DailyReviewsService],
})
export class DailyReviewsModule {}
