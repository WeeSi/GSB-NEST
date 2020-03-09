import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    email = '';

    @Column({ type: String })
    @IsString()
    password = '';

    @Column({ type: String })
    @IsString()
    firstName = '';

    @Column({ type: String })
    @IsString()
    lastName = '';

    @Column({ type: String })
    @IsString()
    address = '';

    @Column({ type: String })
    @IsString()
    image = '';

    @Column({ type: Number })
    @IsNumber()
    role = RoleEnum.Commercial;

    @Column({ type: Number })
    @IsNumber()
    gender = GenderEnum.Male;

    @ManyToMany(type => User, {cascade: ['remove', 'insert', 'update'], nullable: true})
    @JoinTable({name: 'doctorIds', joinColumn: {name: 'id'}})
    @Column({type: 'json', nullable: true})
    doctors?: User[];
}
