import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AnomalyTypes } from '../constants/anomalyTypes.enum';
import { Researcher } from '../../researchers/entities/researcher.entity';

@Entity("anomalies")
export class Anomaly {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Researcher, researcher => researcher.competencies)
    creator: Researcher;

    @Column({ 
        type: 'simple-enum',
        enum: AnomalyTypes,
    })
    type: AnomalyTypes;


}