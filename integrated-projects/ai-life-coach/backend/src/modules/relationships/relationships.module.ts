import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';
import { RelationshipRecord } from './entities/relationship-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RelationshipRecord])],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
  exports: [RelationshipsService],
})
export class RelationshipsModule {}
