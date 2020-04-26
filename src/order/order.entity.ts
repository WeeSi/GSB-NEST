import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Medicament } from 'src/medicament/medicament.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: Number })
    @IsNumber()
    medicineNumber:number;

    @Column({ type: String })
    @IsString()
    medicineName = '';

    @Column({ type: String })
    @IsString()
    medicineImg = '';

    @Column({ type: Number })
    @IsNumber()
    medicinePrice:number;

    @Column({ type: String })
    @IsString()
    medicineCategorie = '';

    @Column({ type: Number })
    @IsNumber()
    userOrder:number;

    @Column({ type: Number })
    @IsNumber()
    quantity:number;
}
