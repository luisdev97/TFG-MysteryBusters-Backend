import { LocationType } from '../../constants/locationType.type';
export type IncidentInput = {
        anomaly_id: number;
        description: string;
        location: LocationType;
        maxResearchers: number;
        date: string;
        time: string;
}
