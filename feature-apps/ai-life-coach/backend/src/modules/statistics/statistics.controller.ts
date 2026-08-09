import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('growth')
  getGrowthStatistics() {
    return this.statisticsService.getGrowthStatistics();
  }

  @Get('financial')
  getFinancialStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.statisticsService.getFinancialStatistics(startDate, endDate);
  }

  @Get('health')
  getHealthStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.statisticsService.getHealthStatistics(startDate, endDate);
  }

  @Get('time')
  getTimeStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.statisticsService.getTimeStatistics(startDate, endDate);
  }

  @Get()
  getAllStatistics(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.statisticsService.getAllStatistics(startDate, endDate);
  }
}
