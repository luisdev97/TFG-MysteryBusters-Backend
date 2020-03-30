import { Module } from '@nestjs/common';
import { AnomaliesService } from './services/anomalies.service';
import { AnomaliesResolver } from './resolvers/anomalies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anomaly } from './entities/anomaly.entity';
import { IncidentsService } from './services/incidents.service';
import { IncidentsResolver } from './resolvers/incidents.resolver';
import { Incident } from './entities/incident.entity';
import { ResearchersService } from '../researchers/researchers.service';
import { Researcher } from 'src/researchers/entities/researcher.entity';
import { ResearchersModule } from '../researchers/researchers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anomaly, Incident, Researcher]), ResearchersModule],
  providers: [AnomaliesService, AnomaliesResolver, IncidentsService, IncidentsResolver, ResearchersService]
})
export class AnomaliesModule {}
