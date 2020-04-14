import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
import { Medicament } from '../medicament/medicament.entity';
import { Meeting } from 'src/meeting/meeting.entity';

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

    @OneToMany(() => Medicament, (medicine) => medicine.id)
    @JoinTable({name: 'medicineIds', joinColumn: {name: 'id'}})
    @Column({type: 'json'})
    medicines ?: Medicament[];

}
