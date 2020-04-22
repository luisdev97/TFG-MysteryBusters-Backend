import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { LocationType } from "../constants/locationType.type";
import { Anomaly } from './anomaly.entity';
import { Researcher } from 'src/researchers/entities/researcher.entity';

@Entity("incidents")
export class Incident {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anomaly_id?: Anomaly['id'];

    @ManyToOne(type => Anomaly, anomaly => anomaly.incidents)
    @JoinColumn({ name: "anomaly_id"})
    belong_to_anomaly: Anomaly;

    @Column({nullable: true})
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true})
    img: string;

    @Column({
        type: 'json'
    })
    location: LocationType;

    @Column({
        type: "date"
    })
    date: string;

    @Column({
        type: "time"
    })
    time: string; 

    @Column()
    maxResearchers: number;

    @Column({
        default: false
    })
    resolved: boolean;

    @ManyToMany(type => Researcher , researcher => researcher.assigned_incidents, { cascade: true })
    @JoinTable({ name: "researchers_investigate_incidents"})
    researchers: Researcher[];

}    


    

