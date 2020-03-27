import { Module } from '@nestjs/common';
import { ResearchersResolver } from './researchers.resolver';
import { ResearchersService } from './researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher])],
  providers: [ResearchersResolver, ResearchersService]
})
export class ResearchersModule {}
