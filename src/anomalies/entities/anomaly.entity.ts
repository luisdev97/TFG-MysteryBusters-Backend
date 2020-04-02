import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AnomalyTypes } from '../constants/anomalyTypes.enum';
import { Researcher } from '../../researchers/entities/researcher.entity';
import { Incident } from './incident.entity';

@Entity("anomalies")
export class Anomaly {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    researcher_id?: Researcher['id'];

    @Column()
    description: string;

    @OneToMany(type => Incident, incident => incident.belong_to_anomaly)
    incidents: Incident[]

    @Column({ 
        type: 'simple-enum',
        enum: AnomalyTypes,
    })
    type: AnomalyTypes;


    @ManyToOne(type => Researcher, researcher => researcher.posted_anomalies)
    @JoinColumn({ name: "researcher_id"})
    creator: Researcher;



}