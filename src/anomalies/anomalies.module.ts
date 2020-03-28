import { Module } from '@nestjs/common';
import { AnomaliesService } from './anomalies.service';
import { AnomaliesResolver } from './anomalies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anomaly } from './entities/anomaly.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anomaly])],
  providers: [AnomaliesService, AnomaliesResolver]
})
export class AnomaliesModule {}
