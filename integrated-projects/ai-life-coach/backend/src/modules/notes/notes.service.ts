import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async create(data: Partial<Note>): Promise<Note> {
    const note = this.noteRepository.create(data);
    return this.noteRepository.save(note);
  }

  async findAll(): Promise<Note[]> {
    return this.noteRepository.find({
      relations: ['book'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ['book'],
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async findByBookId(bookId: number): Promise<Note[]> {
    return this.noteRepository.find({
      where: { bookId },
      order: { noteDate: 'DESC' },
    });
  }

  async update(id: number, data: Partial<Note>): Promise<Note> {
    await this.noteRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const note = await this.findOne(id);
    await this.noteRepository.remove(note);
  }
}
