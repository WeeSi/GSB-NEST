import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository, UpdateResult, In, Like } from 'typeorm';
import { User } from './user.entity';
import { RoleEnum } from '../common/role.enum';


@Injectable()
export class UserService {


    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(name:string,lastname:string,email:string,role:number): Promise<User[]> {
        if(role == -1){
            return await this.usersRepository.find({
                where : [
                    {firstName : Like(`%${name}%`), lastName : Like(`%${lastname}%`) , email : Like(`%${email}%`)}
                ]
            });
        }else{
            return await this.usersRepository.find({
                where : [
                    {firstName : Like(`%${name}%`),lastName : Like(`%${lastname}%`),  email : Like(`%${email}%`),  role: role}
                ]
            });
        }
    }
    async getUserById(id: number): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: [{ id }],
        });

        if (!user) {
            throw new NotFoundException('Cet utilisateur n\'existe pas');
        }
        return user;
    }

    async getUserByMail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ email }]
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

        const user_password= (await this.getUserById(id)).password;

        if (!!user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        if(user_password != user.password){
            throw new NotFoundException('Mauvais mot de passe');
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

    async getCommercials(firstName:string, lastName:string, email:string, adresse:string): Promise<User[]> {
        return await this.usersRepository.find({
            where: [
                { 
                    role: RoleEnum.Commercial, 
                    firstName : Like(`%${firstName}%`), 
                    lastName : Like(`%${lastName}%`), 
                    email : Like(`%${email}%`), 
                    address : Like(`%${adresse}%`) 
                }
            ],
        });
    }

    async getDoctors(): Promise<User[]> {
        return await this.usersRepository.find({
            where: [{ role: RoleEnum.Doctor }],
        });
    }

    async selectCommercials(): Promise<User[]> {
        return await this.usersRepository.find({
            where: [{ role: RoleEnum.Commercial }],
        });
    }

    async getCommercialFromId(userId: number): Promise<User> {
        const commercial: User = await this.getUserById(userId);
        const isUserCommercial: boolean = commercial.role === RoleEnum.Commercial;
        if (!isUserCommercial) {
            throw new ForbiddenException('Cet utilisateur n\'a pas le rôle commercial.');
        }
        return commercial;
    }

    async getDoctorFromId(userId: number): Promise<User> {
        const doctor: User = await this.getUserById(userId);
        const isUserDoctor: boolean = doctor.role === RoleEnum.Doctor;
        if (!isUserDoctor) {
            throw new ForbiddenException('Cet utilisateur n\'a pas le rôle médecin.');
        }
        return doctor;
    }

}
