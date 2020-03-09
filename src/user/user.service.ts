import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { RoleEnum } from '../common/role.enum';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['doctors'],
        });
    }

    async getUserById(id: number): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: [{ id }],
            relations: ['doctors'],
        });

        if (!user) {
            throw new NotFoundException('Cet utilisateur n\'existe pas');
        }
        return user;
    }

    async getUserByMail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ email }],
            relations: ['doctors'],
        });
    }

    async emailExists(email: string): Promise<boolean> {
        return !!await this.getUserByMail(email);
    }

    async createUser(user: Partial<User>): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        const emailExists = await this.emailExists(user.email);
        if (emailExists) {
            throw new ForbiddenException('Cet email est déjà utilisé.');
        }

        const userCreated: User = this.usersRepository.create(user);
        return this.usersRepository.save(userCreated);
    }

    async checkUserCredentials(email: string, password: string): Promise<User | undefined> {
        const user: User = await this.getUserByMail(email);
        if (!user) {
            throw new UnauthorizedException('Cet utilisateur n\'existe pas.');
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Mot de passe incorrect.');
        }
        return user;
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        if (!!user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        const result: UpdateResult = await this.usersRepository.update(id, user);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('Cet utilisateur n\'existe pas.');
        }
        return await this.getUserById(id);
    }

    async updateMe(id: number, user: Partial<User>): Promise<User> {
        if (!!user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        const result: UpdateResult = await this.usersRepository.update(id, user);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('Cet utilisateur n\'existe pas.');
        }
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const user: User | undefined = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException('Cet utilisateur n\'existe pas.');
        }
        await this.usersRepository.delete(user.id);
    }

    async getCommercials(): Promise<User[]> {
        return await this.usersRepository.find({
            where: [{ role: RoleEnum.Commercial }],
        });
    }

    async getDoctors(): Promise<User[]> {
        return await this.usersRepository.find({
            where: [{ role: RoleEnum.Doctor }],
        });
    }

    async getCommercialFromId(userId: number): Promise<User> {
        const patient: User = await this.getUserById(userId);
        const isUserPatient: boolean = patient.role === RoleEnum.Commercial;
        if (!isUserPatient) {
            throw new ForbiddenException('Cet utilisateur n\'a pas le rôle patient.');
        }
        return patient;
    }

    async getDoctorFromId(userId: number): Promise<User> {
        const doctor: User = await this.getUserById(userId);
        const isUserDoctor: boolean = doctor.role === RoleEnum.Doctor;
        if (!isUserDoctor) {
            throw new ForbiddenException('Cet utilisateur n\'a pas le rôle médecin.');
        }
        return doctor;
    }

    private userTokenIdMatchcommercialId(userTokenId: number, commercialId: number): void {
        if (userTokenId !== commercialId) {
            throw new UnauthorizedException('Le token de cet utilisateur ne correspond pas à un commercial.');
        }
    }

    async addDoctorToPatient(userTokenId: number, commercialId: number, doctorId: number): Promise<User> {
        this.userTokenIdMatchcommercialId(userTokenId, commercialId);
        const patient: User = await this.getCommercialFromId(commercialId);
        const doctor: User = await this.getDoctorFromId(doctorId);
        if (patient.doctors.find(d => d.id === doctor.id)) {
            throw new ForbiddenException('Ce médecin est déjà attaché à ce commercial.');
        }

        patient.doctors = patient.doctors.concat(doctor);
        return await this.usersRepository.save(patient);
    }

    async removeDoctorToPatient(userTokenId: number, commercialId: number, doctorId: number): Promise<User> {
        this.userTokenIdMatchcommercialId(userTokenId, commercialId);
        const commercial : User = await this.getCommercialFromId(commercialId);
        const doctor: User = await this.getDoctorFromId(doctorId);

        if (!commercial.doctors.find(d => d.id === doctor.id)) {
            throw new ForbiddenException('Ce médecin n\'est pas attaché à ce patient.');
        }

        commercial.doctors = commercial.doctors.filter(d => d.id !== doctor.id);
        return await this.usersRepository.save(commercial);
    }

    async getAllDoctorPatients(doctorTokenId: number): Promise<User[]> {
        await this.getDoctorFromId(doctorTokenId);
        const patients: User[] = await this.getCommercials();
        return patients.filter((p) => p.doctors.find(d => d.id === doctorTokenId));
    }
}
