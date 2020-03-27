import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, ManyToMany, JoinTable } from "typeorm";
import { Length, IsEmail, Min, Max, MinLength} from "class-validator";
import bcrypt from 'bcrypt';
import { ResearcherRole as Rol } from "../constants/roles";
import { ResearcherCompetencie  } from './researcherCompetencie.entity';

@Entity()
export class Researcher {

    private hashPassword = pass => bcrypt.hashSync(pass, 10)
    
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

    @ManyToMany(type => ResearcherCompetencie)
    @JoinTable()
    competencies: ResearcherCompetencie[];


    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeInsert()  
    @BeforeUpdate()
    private encryptPassword(): void {
        const newPassword = this.hashPassword(this.password);
        if(this.tempPassword){
            console.log('Existe la pass', this.password);
            if(this.tempPassword !== newPassword)
                this.password = newPassword;
        }else
            this.password = newPassword;
    }
  
    
    
}