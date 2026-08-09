import { Controller, Get, Post, Put, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { FinancialService } from './financial.service';

@Controller('financial')
export class FinancialController {
  constructor(private readonly financialService: FinancialService) {}

  @Post('record')
  createRecord(@Body() data: any) {
    return this.financialService.createFinancialRecord(data);
  }

  @Get('records')
  getRecords(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.financialService.findFinancialRecords(startDate, endDate);
  }

  @Post('income')
  createIncome(@Body() data: any) {
    return this.financialService.createIncomeSource(data);
  }

  @Get('income')
  getIncome(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.financialService.findIncomeSources(startDate, endDate);
  }

  @Post('expense')
  createExpense(@Body() data: any) {
    return this.financialService.createExpense(data);
  }

  @Get('expenses')
  getExpenses(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.financialService.findExpenses(startDate, endDate);
  }

  @Get('expenses/stats')
  getExpenseStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.financialService.getExpenseStats(startDate, endDate);
  }

  @Post('career')
  createCareer(@Body() data: any) {
    return this.financialService.createCareer(data);
  }

  @Get('career')
  getCareerPlans(@Query('status') status?: string) {
    return this.financialService.findCareerPlans(status);
  }

  @Put('career/:id/progress')
  updateCareerProgress(@Param('id', ParseIntPipe) id: number, @Body('progress') progress: number) {
    return this.financialService.updateCareerProgress(id, progress);
  }

  @Post('review/:date')
  createOrUpdateReview(@Param('date') date: string, @Body() data: any) {
    return this.financialService.createOrUpdateReview(date, data);
  }

  @Get('review/:date')
  getDailyReview(@Param('date') date: string) {
    return this.financialService.getDailyReview(date);
  }

  @Get('review/monthly/:year/:month')
  getMonthlyReview(@Param('year', ParseIntPipe) year: number, @Param('month', ParseIntPipe) month: number) {
    return this.financialService.getMonthlyReview(year, month);
  }
}
