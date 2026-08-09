import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { DailyReviewsService } from './daily-reviews.service';

@Controller('daily-reviews')
export class DailyReviewsController {
  constructor(private readonly dailyReviewsService: DailyReviewsService) {}

  @Post(':date')
  createOrUpdate(@Param('date') date: string, @Body() data: any) {
    return this.dailyReviewsService.createOrUpdate(date, data);
  }

  @Get()
  findAll(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.dailyReviewsService.findAll(startDate, endDate);
  }

  @Get(':date')
  findByDate(@Param('date') date: string) {
    return this.dailyReviewsService.findByDate(date);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.dailyReviewsService.delete(id);
  }
}
