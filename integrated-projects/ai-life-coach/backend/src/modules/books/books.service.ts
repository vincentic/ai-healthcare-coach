import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book, BookStatus } from './entities/book.entity';
import { BookDimensionLink, Dimension } from './entities/book-dimension-link.entity';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { CreateDimensionLinkDto } from './dto/book-dimension-link.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(BookDimensionLink)
    private dimensionLinkRepository: Repository<BookDimensionLink>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create({
      ...createBookDto,
      status: BookStatus.TODO,
    });
    return this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['dimensionLinks', 'notes'],
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);
    // Explicitly handle null values to clear fields
    const { startDate, finishDate, estimatedFinishDate, ...rest } = updateBookDto;
    if (startDate !== undefined) {
      book.startDate = startDate ? new Date(startDate) : null;
    }
    if (finishDate !== undefined) {
      book.finishDate = finishDate ? new Date(finishDate) : null;
    }
    if (estimatedFinishDate !== undefined) {
      book.estimatedFinishDate = estimatedFinishDate ? new Date(estimatedFinishDate) : null;
    }
    Object.assign(book, rest);
    return this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }

  async findByStatus(status: BookStatus): Promise<Book[]> {
    return this.bookRepository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }

  // Book Dimension Links
  async addDimensionLink(bookId: number, dto: CreateDimensionLinkDto): Promise<BookDimensionLink> {
    const book = await this.findOne(bookId);
    const link = this.dimensionLinkRepository.create({
      ...dto,
      bookId: book.id,
    });
    return this.dimensionLinkRepository.save(link);
  }

  async findDimensionLinks(bookId: number): Promise<BookDimensionLink[]> {
    return this.dimensionLinkRepository.find({
      where: { bookId },
      relations: ['book'],
      order: { recordDate: 'DESC' },
    });
  }

  async findBooksByDimension(dimension: Dimension): Promise<Book[]> {
    const links = await this.dimensionLinkRepository.find({
      where: { dimension },
    });
    const bookIds = [...new Set(links.map((l) => l.bookId))];
    if (bookIds.length === 0) return [];
    return this.bookRepository.findByIds(bookIds);
  }

  async findDimensionLinksByDimension(dimension: Dimension): Promise<BookDimensionLink[]> {
    return this.dimensionLinkRepository.find({
      where: { dimension },
      relations: ['book'],
      order: { recordDate: 'DESC' },
    });
  }
}
