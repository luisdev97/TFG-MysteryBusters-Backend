import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ResearchersModule } from './researchers/researchers.module';
import { AnomaliesModule } from './anomalies/anomalies.module';
import * as GraphQLJSON from 'graphql-type-json';
import {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime
} from 'graphql-iso-date';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      resolvers: { 
        JSON: GraphQLJSON,
        Date: GraphQLDate,
        Time: GraphQLDateTime
      }
    }),
    ResearchersModule,
    AnomaliesModule
  ]
})
export class AppModule {}
