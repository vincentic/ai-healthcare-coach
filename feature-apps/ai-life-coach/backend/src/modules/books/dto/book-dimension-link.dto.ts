import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { Dimension } from '../entities/book-dimension-link.entity';

export class CreateDimensionLinkDto {
  @IsEnum(Dimension)
  dimension!: Dimension;

  @IsOptional()
  @IsNumber()
  impactLevel?: number;

  @IsOptional()
  @IsString()
  impactDescription?: string;

  @IsOptional()
  @IsString()
  appliedAction?: string;

  @IsOptional()
  @IsString()
  changeResult?: string;

  @IsOptional()
  @IsString()
  readingGains?: string;

  @IsDateString()
  recordDate!: string;
}
