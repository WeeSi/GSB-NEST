import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MeetingState } from './model/state.enum';

@Injectable()
export class MeetingService {

    constructor(@InjectRepository(Meeting) private meetingsRepository: Repository<Meeting>) { }

    async findOneById(id: number): Promise<Meeting> {
        const meeting = await this.meetingsRepository.findOne({ where: { id } });
        if (!meeting) {
            throw new NotFoundException('Ce rendez-vous n\'existe pas');
        }
        return meeting;
    }

    async findOneByIdWithRelations(id: number): Promise<Meeting> {
        return this.meetingsRepository.findOne({
            where: { id },
            relations: ['attendee', 'organizer'],
        });
    }

    async getUserMeetings(userId: number): Promise<Meeting[]> {
        return this.meetingsRepository.find({
            where: [
                { attendee: userId },
                { organizer: userId },
            ],
            relations: ['attendee', 'organizer'],
            order: {
                date: 'DESC',
                state: 'DESC',
            },
        });
    }

    async getHours(date: string, userId:number): Promise<Meeting[]> {
        return this.meetingsRepository.find({
            select : ['hours'],
            where: [
                { organizer: userId, date : date }
            ]
        });
    }

    async createMeeting(meetingToCreate: Partial<Meeting>): Promise<Meeting> {
        const createdMeeting: Meeting = await this.meetingsRepository.save(meetingToCreate);
        return this.findOneByIdWithRelations(createdMeeting.id);
    }

    async acceptMeeting(id: number): Promise<Meeting> {
        const meetingToValidate: Meeting = await this.findOneById(id);
        meetingToValidate.state = MeetingState.Accepted;
        await this.meetingsRepository.save(meetingToValidate);
        return this.findOneByIdWithRelations(meetingToValidate.id);
    }

    async declineMeeting(id: number): Promise<Meeting> {
        const meetingToDecline: Meeting = await this.findOneById(id);
        meetingToDecline.state = MeetingState.Declined;
        await this.meetingsRepository.save(meetingToDecline);
        return this.findOneByIdWithRelations(meetingToDecline.id);
    }
}