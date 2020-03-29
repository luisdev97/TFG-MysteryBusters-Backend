import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AnomalyTypes } from '../constants/anomalyTypes.enum';
import { Researcher } from '../../researchers/entities/researcher.entity';
import { Incident } from './incident.entity';

@Entity("anomalies")
export class Anomaly {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Researcher, researcher => researcher.competencies)
    creator: Researcher;

    @Column()
    description: string;

    @OneToMany(type => Incident, incident => incident.anomaly)
    incidents: Incident[]

    @Column({ 
        type: 'simple-enum',
        enum: AnomalyTypes,
    })
    type: AnomalyTypes;


}