import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like, In } from 'typeorm';
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

    async deleteMeeting(id:number): Promise<void>{
        const meeting: Meeting | undefined = await this.findOneById(id);
        if (!meeting) {
            throw new NotFoundException('Ce rendez-vous n\'existe pas.');
        }
        await this.meetingsRepository.delete(meeting.id);
    }

    async findOneByIdWithRelations(id: number): Promise<Meeting> {
        return this.meetingsRepository.findOne({
            where: { id },
            relations: ['attendee', 'organizer'],
        });
    }

    async getUserMeetings(userId: number, date: string, commercial: number, doctor: number, state: number): Promise<Meeting[]> {

        var queryMeetingState;
        if(state == -1){
            queryMeetingState = In([0,1,2]);
        }else{
            queryMeetingState = state;
        }
       
        if(commercial == -1 && doctor == -1){
            return this.meetingsRepository.find({
                where: [
                    { attendee: userId, date :  Like(`%${date}%`), state :queryMeetingState},
                    { organizer: userId, date : Like(`%${date}%`), state :queryMeetingState},
                ],
                relations: ['attendee', 'organizer'],
                order: {
                    date: 'DESC',
                    state: 'DESC',
                },
            });
        }else{
            if(commercial != -1 && doctor != -1){
                return this.meetingsRepository.find({
                    where: [
                        { attendee: userId, date :  Like(`%${date}%`),organizer : commercial, state :queryMeetingState},
                        { organizer: userId, date : Like(`%${date}%`), attendee : doctor, state : queryMeetingState},
                    ],
                    relations: ['attendee', 'organizer'],
                    order: {
                        date: 'DESC',
                        state: 'DESC',
                    },
                });
            }else{
                if(commercial == -1){
                    return this.meetingsRepository.find({
                        where: [
                            { attendee: userId, date :  Like(`%${date}%`), state :queryMeetingState},
                            { organizer: userId, date : Like(`%${date}%`), attendee : doctor, state : queryMeetingState},
                        ],
                        relations: ['attendee', 'organizer'],
                        order: {
                            date: 'DESC',
                            state: 'DESC',
                        },
                    });
                }
                if(doctor == -1){
                    return this.meetingsRepository.find({
                        where: [
                            { attendee: userId, date :  Like(`%${date}%`),organizer : commercial, state :queryMeetingState},
                            { organizer: userId, date : Like(`%${date}%`), state : queryMeetingState},
                        ],
                        relations: ['attendee', 'organizer'],
                        order: {
                            date: 'DESC',
                            state: 'DESC',
                        },
                    });
                }
            }
        }
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