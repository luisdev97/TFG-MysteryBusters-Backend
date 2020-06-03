import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ResearchersModule } from './researchers/researchers.module';
import { AnomaliesModule } from './anomalies/anomalies.module';
import { join } from 'path';
import * as GraphQLJSON from 'graphql-type-json';
import {
  GraphQLDate,
  GraphQLTime
} from 'graphql-iso-date';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      resolvers: { 
        JSON: GraphQLJSON,
        Date: GraphQLDate,
        Time: GraphQLTime
      }
    }),
    ResearchersModule,
    AnomaliesModule,
    AuthModule
  ]
})
export class AppModule {}
