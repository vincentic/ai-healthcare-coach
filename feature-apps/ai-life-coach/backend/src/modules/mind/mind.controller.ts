import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { MindService } from './mind.service';

@Controller('mind')
export class MindController {
  constructor(private readonly mindService: MindService) {}

  // Healing Practice
  @Post('healing')
  createHealing(@Body() data: any) {
    return this.mindService.createHealing(data);
  }

  @Get('healing')
  findHealing(@Query('type') type?: string, @Query('bookId') bookId?: number) {
    return this.mindService.findHealing(type, bookId);
  }

  // Growth Path
  @Post('path')
  createPath(@Body() data: any) {
    return this.mindService.createPath(data);
  }

  @Get('path')
  findPaths(@Query('status') status?: string) {
    return this.mindService.findPaths(status);
  }

  // Knowledge Experience
  @Post('knowledge')
  createKnowledge(@Body() data: any) {
    return this.mindService.createKnowledge(data);
  }

  @Get('knowledge')
  findKnowledge(@Query('type') type?: string, @Query('bookId') bookId?: number) {
    return this.mindService.findKnowledge(type, bookId);
  }

  // Synchronicity
  @Post('synchronicity')
  createSynchronicity(@Body() data: any) {
    return this.mindService.createSynchronicity(data);
  }

  @Get('synchronicity')
  findSynchronicity(@Query('type') type?: string) {
    return this.mindService.findSynchronicity(type);
  }

  // Stats
  @Get('stats')
  getStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.mindService.getMindStats(startDate, endDate);
  }
}
