import { CreateMeetingDto } from '../model/createMeeting.dto';
import { Meeting } from '../meeting.entity';
import { Converter } from '../../common/converter';
import { MeetingState } from '../model/state.enum';

export class CreateMeetingDtoConverter implements Converter<CreateMeetingDto, Partial<Meeting>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(meeting: CreateMeetingDto): Partial<Meeting> {
        const meetingToCreate = {
            attendee:meeting.attendee,
            organizer:meeting.organizer,
            date:meeting.date.toString(),
            hours:meeting.hours,
            state: MeetingState.Pending,
        }

        return meetingToCreate;
    }
}