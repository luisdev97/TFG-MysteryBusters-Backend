import { AnomalyTypes } from '../../constants/anomalyTypes.enum';
export type AnomalyInput = {
    researcher_id: number
    description: string;
    type: AnomalyTypes;
}