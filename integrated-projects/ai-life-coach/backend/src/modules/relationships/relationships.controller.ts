import { Controller, Get, Post, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post()
  create(@Body() data: any) {
    return this.relationshipsService.create(data);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.relationshipsService.findAll(category as any, startDate, endDate);
  }

  @Get('person/:name')
  findByPerson(@Param('name') name: string) {
    return this.relationshipsService.findByPerson(name);
  }

  @Get('stats')
  getStats(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.relationshipsService.getRelationshipStats(startDate, endDate);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.relationshipsService.delete(id);
  }
}
