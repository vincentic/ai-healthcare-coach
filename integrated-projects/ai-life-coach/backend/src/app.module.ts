import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { NotesModule } from './modules/notes/notes.module';
import { FinancialModule } from './modules/financial/financial.module';
import { HealthModule } from './modules/health/health.module';
import { TimeModule } from './modules/time/time.module';
import { MindModule } from './modules/mind/mind.module';
import { RelationshipsModule } from './modules/relationships/relationships.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { WorkLogsModule } from './modules/work-logs/work-logs.module';
import { DailyReviewsModule } from './modules/daily-reviews/daily-reviews.module';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USERNAME', 'root'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_DATABASE', 'growth_system'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNCHRONIZE', true),
        logging: configService.get('DB_LOGGING', false),
      }),
      inject: [ConfigService],
    }),

    // Feature modules
    BooksModule,
    NotesModule,
    FinancialModule,
    HealthModule,
    TimeModule,
    MindModule,
    RelationshipsModule,
    StatisticsModule,
    WorkLogsModule,
    DailyReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
