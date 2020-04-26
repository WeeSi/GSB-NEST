import { MeetingDtoConverter } from './converter/meetingDto.converter';
import { CreateMeetingDtoConverter } from './converter/createMeetingDto.converter';
import { Meeting } from './meeting.entity';
import { CreateMeetingDto } from './model/createMeeting.dto';
import { ApiImplicitBody, ApiResponse, ApiUseTags, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import { Controller, Put, Body, Post, Param, ParseIntPipe, Get, Query } from '@nestjs/common';
import { MeetingDto } from './model/meeting.dto';
import { MeetingService } from './meeting.service';
import { HoursDtoConverter } from './converter/hoursDto.converter';
import { HoursDto } from './model/hours.dto';

@ApiUseTags('meeting')
@Controller('meeting')
export class MeetingController {

    constructor(
        private readonly createMeetingDtoConverter: CreateMeetingDtoConverter,
        private readonly meetingDtoConverter: MeetingDtoConverter,
        private readonly meetingsService: MeetingService,
        private readonly hoursDtoConverter : HoursDtoConverter
    ) {}

    @Get(':id')
    @ApiResponse({ status: 201, description: 'User meetings', type: MeetingDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiImplicitQuery({ name: 'date', type: String, description: 'date to retrieve' })
    @ApiImplicitQuery({ name: 'commercial', type: Number, description: 'commercial to retrieve' })
    @ApiImplicitQuery({ name: 'doctor', type: Number, description: 'doctor to retrieve' })
    @ApiImplicitQuery({ name: 'state', type: Number, description: 'state to retrieve' })
    async meetings(
        @Param('id', ParseIntPipe) userId: number,
        @Query('date') date: string,
        @Query('commercial') commercial: number,
        @Query('doctor') doctor: number,
        @Query('state') state: number,
        ): Promise<MeetingDto[]> {
        const userMeetings: Meeting[] = await this.meetingsService.getUserMeetings(userId, date, commercial, doctor, state);
        return this.meetingDtoConverter.convertOutboundCollection(userMeetings);
    }

    @Get('search/:date/:id')
    @ApiResponse({ status: 201, description: 'User meetings', type: HoursDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getHoursFromDate(
        @Param('date') date: string,
        @Param('id', ParseIntPipe) id : number,
    )
    : Promise<HoursDto[]> {
        const userMeetings: Meeting[] = await this.meetingsService.getHours(date, id);
        return this.hoursDtoConverter.convertOutboundCollection(userMeetings);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateMeetingDto', description: 'Meeting to create', type: CreateMeetingDto})
    @ApiResponse({ status: 201, description: 'User found', type: MeetingDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async create(@Body() meeting: CreateMeetingDto): Promise<MeetingDto> {
        const meetingToCreate: Partial<Meeting> = this.createMeetingDtoConverter.convertInbound(meeting);
        const createdMeeting: Meeting = await this.meetingsService.createMeeting(meetingToCreate);
        return this.meetingDtoConverter.convertOutbound(createdMeeting);
    }

    @Post(':id/accept')
    @ApiImplicitParam({ name: 'id', description: 'Meeting identifier to accept', type: Number})
    @ApiResponse({ status: 201, description: 'Accepted Meeting', type: MeetingDto})
    @ApiResponse({ status: 401, description: 'Meeting not found'})
    async validate(@Param('id', ParseIntPipe) meetingId: number): Promise<MeetingDto> {
        const acceptedMeeting: Meeting = await this.meetingsService.acceptMeeting(meetingId);
        return this.meetingDtoConverter.convertOutbound(acceptedMeeting);
    }

    @Post(':id/decline')
    @ApiImplicitParam({ name: 'id', description: 'Meeting identifier to decline', type: Number})
    @ApiResponse({ status: 201, description: 'Declined Meeting', type: MeetingDto})
    @ApiResponse({ status: 401, description: 'Meeting not found'})
    async decline(@Param('id', ParseIntPipe) meetingId: number): Promise<MeetingDto> {
        const declinedMeeting: Meeting = await this.meetingsService.declineMeeting(meetingId);
        return this.meetingDtoConverter.convertOutbound(declinedMeeting);
    }
}