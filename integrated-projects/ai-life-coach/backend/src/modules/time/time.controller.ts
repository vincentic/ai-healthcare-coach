import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { TimeService } from './time.service';

@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService) {}

  @Post()
  create(@Body() data: any) {
    return this.timeService.create(data);
  }

  @Get()
  findAll(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('category') category?: string,
  ) {
    return this.timeService.findAll(startDate, endDate, category);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.timeService.findByDate(date);
  }

  @Get('stats')
  getStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.timeService.getTimeStats(startDate, endDate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.timeService.delete(id);
  }
}
