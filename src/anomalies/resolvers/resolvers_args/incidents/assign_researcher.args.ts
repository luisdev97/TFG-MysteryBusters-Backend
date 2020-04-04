import { ArgsType } from "@nestjs/graphql";
import { UpdateIncidentInput } from "src/schema.graphql";
import { Incident } from '../../../entities/incident.entity';
import { Researcher } from "src/researchers/entities/researcher.entity";

@ArgsType()
export class AssignResearcherArgs {
    incident_id: Incident['id'];
    researcher_id: Researcher['id'];
}