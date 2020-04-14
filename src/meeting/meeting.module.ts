  
import { MeetingDtoConverter } from './converter/meetingDto.converter';
import { CreateMeetingDtoConverter } from './converter/createMeetingDto.converter';
import { Meeting } from './meeting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { HoursDtoConverter } from './converter/hoursDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting])],
  controllers: [MeetingController],
  providers: [
    MeetingService,
    CreateMeetingDtoConverter,
    MeetingDtoConverter,
    HoursDtoConverter
  ],
})
export class MeetingModule {}