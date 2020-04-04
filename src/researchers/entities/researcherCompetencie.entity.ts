import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Researcher } from './researcher.entity';

@Entity("researcher_competencies")
export class ResearcherCompetencie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @ManyToMany(type => Researcher, researcher => researcher.competencies, { cascade: true} )
    @JoinTable({ name: "researchers_has_competencies"})
    researchers: Researcher[];


}