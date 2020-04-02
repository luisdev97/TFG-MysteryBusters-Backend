import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Length, IsEmail, Min, Max, MinLength} from "class-validator";
import { ResearcherRole as Rol } from "../constants/roles";
import { ResearcherCompetencie  } from './researcherCompetencie.entity';
import { Anomaly } from '../../anomalies/entities/anomaly.entity';
import { Incident } from "src/anomalies/entities/incident.entity";
const bcrypt = require('bcrypt')

@Entity("researchers")
export class Researcher {

    //private readonly hashPassword = pass => bcrypt.hashSync(pass, 10)
    hashPassword(pass){
        return bcrypt.hashSync(pass, 10)
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(30)
    firstname: string;

    @Length(30)
    @Column({ nullable: true })
    lastname: string;

    @Column()
    @Min(18)
    @Max(120)
    age: number;


    @Column({ default: true })
    active: boolean;

    @Column({ unique: true})
    username: string;

    @Column()
    @MinLength(5)
    password: string;

    private tempPassword: string;

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
    @JoinTable({ name: "researchers_has_competencies"})
    competencies: ResearcherCompetencie[];

    
    @OneToMany(type => Anomaly, anomaly => anomaly.creator)
    posted_anomalies: Anomaly[];
























    @ManyToMany(type => Incident, (incident: Incident) => incident.assigned_researchers)
    investigated_incidents!: Incident[];


    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()  
    @BeforeUpdate()
    private encryptPassword(): void {
        const newPassword = this.hashPassword(this.password);
        if(this.tempPassword){
            if(this.tempPassword !== newPassword)
                this.password = newPassword;
        }else
            this.password = newPassword;
    }
  
    
    
}