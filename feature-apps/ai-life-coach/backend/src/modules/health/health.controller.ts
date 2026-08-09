import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post('record')
  createRecord(@Body() data: any) {
    return this.healthService.createHealthRecord(data);
  }

  @Get('records')
  getRecords(@Query('type') type?: string, @Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.healthService.findHealthRecords(type, startDate, endDate);
  }

  @Post('hygiene')
  createHygiene(@Body() data: any) {
    return this.healthService.createHygiene(data);
  }

  @Get('hygiene')
  getHygiene(@Query('type') type?: string) {
    return this.healthService.findHygieneRecords(type);
  }

  @Post('emotion')
  createEmotion(@Body() data: any) {
    return this.healthService.createEmotion(data);
  }

  @Get('emotions')
  getEmotions(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.healthService.findEmotions(startDate, endDate);
  }

  @Post('diet')
  createDiet(@Body() data: any) {
    return this.healthService.createDiet(data);
  }

  @Get('diets')
  getDiets(@Query('date') date?: string) {
    return this.healthService.findDietRecords(date);
  }

  @Post('sleep')
  createSleep(@Body() data: any) {
    return this.healthService.createSleep(data);
  }

  @Get('sleep')
  getSleep(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.healthService.findSleepRecords(startDate, endDate);
  }

  @Post('intimate')
  createIntimate(@Body() data: any) {
    return this.healthService.createIntimate(data);
  }

  @Get('intimate')
  getIntimate(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.healthService.findIntimateRecords(startDate, endDate);
  }

  @Get('stats')
  getStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.healthService.getHealthStats(startDate, endDate);
  }
}
