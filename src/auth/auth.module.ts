import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { ResearchersService } from 'src/researchers/researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { ResearcherCompetencie } from 'src/researchers/entities/researcherCompetencie.entity';
import { Incident } from 'src/anomalies/entities/incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher, ResearcherCompetencie, Incident])],

  providers: [AuthResolver, AuthService, ResearchersService]
})
export class AuthModule {}
