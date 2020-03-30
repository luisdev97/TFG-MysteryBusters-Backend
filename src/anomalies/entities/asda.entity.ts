/*import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import { ResearcherEntity } from '../../researchers/entities/researcher.entity';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { OcurrencesEntity } from '../../ocurrences/entities/ocurrences.entity';



@ObjectType()
@Entity('phenomena')
export class PhenomenaEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => ResearcherEntity, researcher => researcher.phenomena)
    researcher: ResearcherEntity;


    @Column({ nullable: true })
    researcherId?: ResearcherEntity['id']




}
*/