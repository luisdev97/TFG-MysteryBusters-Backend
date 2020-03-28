import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("researcher_competencies")
export class ResearcherCompetencie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

}