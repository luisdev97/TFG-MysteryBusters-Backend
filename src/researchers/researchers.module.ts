import { Module } from '@nestjs/common';
import { ResearchersResolver } from './researchers.resolver';
import { ResearchersService } from './researchers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Researcher } from './entities/researcher.entity';
import { ResearcherCompetencie } from './entities/researcherCompetencie.entity';
import { Anomaly } from '../anomalies/entities/anomaly.entity';
import { AnomaliesModule } from '../anomalies/anomalies.module';
import { AnomaliesService } from '../anomalies/services/anomalies.service';
import { Incident } from 'src/anomalies/entities/incident.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Researcher, ResearcherCompetencie, Anomaly, Incident])],
  providers: [ResearchersResolver, ResearchersService, AnomaliesService],
  exports: [ResearchersService]
})
export class ResearchersModule {}
