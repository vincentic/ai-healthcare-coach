import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { CreateDimensionLinkDto } from './dto/book-dimension-link.dto';
import { BookStatus } from './entities/book.entity';
import { Dimension } from './entities/book-dimension-link.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: BookStatus) {
    return this.booksService.findByStatus(status);
  }

  @Get('dimension/:dimension')
  findByDimension(@Param('dimension') dimension: Dimension) {
    return this.booksService.findBooksByDimension(dimension);
  }

  // Dimension Links
  @Post(':id/dimensions')
  addDimensionLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateDimensionLinkDto,
  ) {
    return this.booksService.addDimensionLink(id, dto);
  }

  @Get(':id/dimensions')
  getDimensionLinks(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findDimensionLinks(id);
  }

  @Get('dimension-links/:dimension')
  getDimensionLinksByDimension(@Param('dimension') dimension: Dimension) {
    return this.booksService.findDimensionLinksByDimension(dimension);
  }
}
