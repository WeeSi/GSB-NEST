import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
import { RoleEnum } from '../common/role.enum';
import { Medicament } from 'src/medicament/medicament.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @ManyToOne(() => Medicament, (medicament) => medicament.id)
    @JoinColumn()
    medicine:number;

    @Column({ type: Number })
    @IsString()
    quantity:number;

}
