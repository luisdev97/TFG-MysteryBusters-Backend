import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Length, IsEmail, Min, Max, MinLength} from "class-validator";
import { ResearcherRole as Rol } from "../constants/roles";
import { ResearcherCompetencie  } from './researcherCompetencie.entity';
import { Anomaly } from '../../anomalies/entities/anomaly.entity';
import { Incident } from "src/anomalies/entities/incident.entity";

@Entity("researchers")
export class Researcher {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(30)
    firstname: string;

    @Length(30)
    @Column()
    lastname: string;

    @Column({ nullable: true })
    @Min(18)
    @Max(120)
    age: number;


    @Column({ default: true })
    active: boolean;

    @Column({ unique: true, nullable: true})
    username: string;

    @Column()
    @MinLength(5)
    password: string;


    @Column({ unique: true})
    @IsEmail()
    email: string;


    @Column({ nullable: true })
    avatar: string;
    

    @Column({
        type: 'simple-enum',
        enum: Rol,
        default: Rol.BASIC
    })
    role: Rol;


    @ManyToMany(type => ResearcherCompetencie, competencie => competencie.researchers)
    competencies: ResearcherCompetencie[];

    
    @ManyToMany(type => Incident, incident => incident.researchers)
    assigned_incidents: Incident[];
    
    
    @OneToMany(type => Anomaly, anomaly => anomaly.creator)
    posted_anomalies: Anomaly[];


  
  
    
    
}