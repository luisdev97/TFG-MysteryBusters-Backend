import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ResearchersModule } from './researchers/researchers.module';
import { AnomaliesModule } from './anomalies/anomalies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true
    }),
    ResearchersModule,
    AnomaliesModule
  ]
})
export class AppModule {}
