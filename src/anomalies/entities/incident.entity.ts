import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { LocationType } from "../constants/locationType.type";

@Entity("incidents")
export class Incident {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json'
    })
    location: LocationType;

    @Column()
    date: Date; 

    @Column()
    maxResearchers: number;

    @Column()
    resolved: boolean;


    @ManyToOne()
    


    

}