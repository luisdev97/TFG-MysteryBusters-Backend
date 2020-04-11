import { ArgsType } from "@nestjs/graphql";
import { AnomalyInput } from '../../graphql/inputs/anomaly.input';

@ArgsType()
export class PaginateIncidentsArgs {
    offset: number;
    limit: number;
}