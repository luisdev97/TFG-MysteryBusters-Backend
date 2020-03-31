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
    anomaly: Anomaly;


    @Column()
    description: string;

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

     
    @ManyToMany(type => Researcher, researcher => researcher.investigated_incidents)
    @JoinTable({ 
        name: "researchers_investigate_incidents",
        joinColumn: { name: "researcher_id", referencedColumnName: "id"},
        inverseJoinColumn: { name: "incident_id", referencedColumnName: "id"}
    })
    assigned_researchers!: Researcher[];


}    


    

