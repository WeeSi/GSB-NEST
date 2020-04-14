import { Converter } from '../../common/converter';
import { Meeting } from './../meeting.entity';
import { HoursDto } from '../model/hours.dto';

export class HoursDtoConverter implements Converter<HoursDto, Meeting> {

    constructor() {}

    convertOutbound(meeting: Meeting): HoursDto {
        return {
            hours:meeting.hours
        };
    }

    convertOutboundCollection(meetings: Meeting[]): HoursDto[] {
        return meetings.map((m) => this.convertOutbound(m));
    }
}