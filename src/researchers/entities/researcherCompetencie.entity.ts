import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ResearcherCompetencie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

}