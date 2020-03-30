import { ArgsType } from "@nestjs/graphql";
import { AnomalyInput } from '../../graphql/inputs/anomaly.input';

@ArgsType()
export class UpdateAnomalyArgs {
    id: number;
    input: AnomalyInput
}