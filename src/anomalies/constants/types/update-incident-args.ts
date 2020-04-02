import { ArgsType } from "@nestjs/graphql";
import { UpdateIncidentInput } from "src/schema.graphql";

@ArgsType()
export class UpdateIncidentArgs {
    id: number;
    input: UpdateIncidentInput
}