import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { WorkLogsService } from './work-logs.service';

@Controller('work-logs')
export class WorkLogsController {
  constructor(private readonly workLogsService: WorkLogsService) {}

  @Post()
  create(@Body() data: any) {
    return this.workLogsService.create(data);
  }

  @Get()
  findAll(
    @Query('module') module?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.workLogsService.findAll(module, startDate, endDate);
  }

  @Get('stats')
  getStats(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.workLogsService.getStats(startDate, endDate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.workLogsService.delete(id);
  }
}
