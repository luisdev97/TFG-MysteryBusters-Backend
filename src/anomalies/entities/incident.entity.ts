import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { LocationType } from "../constants/locationType.type";
import { Anomaly } from './anomaly.entity';

@Entity("incidents")
export class Incident {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Anomaly, anomaly => anomaly.incidents)
    anomaly: Anomaly

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

   

}    


    

