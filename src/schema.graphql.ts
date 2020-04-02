
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateAnomalyInput {
    researcher_id: number;
    description: string;
    type: string;
}

export interface CreateIncidentInput {
    anomaly_id: number;
    description: string;
    location: JSON;
    maxResearchers: number;
    date: string;
    time: string;
}

export interface ResearcherInput {
    firstname: string;
    lastname?: string;
    age: number;
    username: string;
    password: string;
    email: string;
    avatar?: string;
}

export interface UpdateAnomalyInput {
    description?: string;
    type?: string;
}

export interface UpdateIncidentInput {
    description?: string;
    location?: JSON;
    maxResearchers?: number;
    date?: string;
    time?: string;
}

export interface Anomaly {
    id: number;
    creator: Researcher;
    description: string;
    type: string;
    incidents?: Incident[];
}

export interface Competencie {
    id: number;
    type: string;
}

export interface Incident {
    id: number;
    belong_to_anomaly: number;
    description: string;
    location: JSON;
    date: Date;
    time: Time;
    maxResearchers: number;
    resolved: boolean;
    assigned_researchers?: Researcher[];
}

export interface IMutation {
    createAnomaly(input: CreateAnomalyInput): Anomaly | Promise<Anomaly>;
    deleteAnomaly(id: number): number | Promise<number>;
    updateAnomaly(id: string, input: UpdateAnomalyInput): Anomaly | Promise<Anomaly>;
    createIncident(input: CreateIncidentInput): Incident | Promise<Incident>;
    deleteIncident(id: number): number | Promise<number>;
    updateIncident(id: string, input: UpdateAnomalyInput): Incident | Promise<Incident>;
    createResearcher(input: ResearcherInput): Researcher | Promise<Researcher>;
}

export interface IQuery {
    getAnomalies(): Anomaly[] | Promise<Anomaly[]>;
    getAnomaly(id: number): Anomaly | Promise<Anomaly>;
    getIncidents(): Incident[] | Promise<Incident[]>;
    getIncident(id: number): Incident | Promise<Incident>;
    getResearchers(): Researcher[] | Promise<Researcher[]>;
    getResearcher(id: number): Researcher | Promise<Researcher>;
}

export interface Researcher {
    id: number;
    firstname: string;
    lastname?: string;
    age: number;
    username: string;
    password: string;
    email: string;
    avatar?: string;
    role: string;
    competencies?: Competencie[];
    posted_anomalies?: Anomaly[];
}

export type JSON = any;
export type Time = any;
