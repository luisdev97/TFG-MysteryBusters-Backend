import { Module } from '@nestjs/common';
import { ResearchersResolver } from './researchers.resolver';
import { ResearchersService } from './researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { ResearcherCompetencie } from './entities/researcherCompetencie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher, ResearcherCompetencie])],
  providers: [ResearchersResolver, ResearchersService]
})
export class ResearchersModule {}
