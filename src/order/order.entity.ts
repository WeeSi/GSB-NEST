import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Medicament } from 'src/medicament/medicament.entity';

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @OneToOne(() => Medicament, (medicament) => medicament.id)
    @JoinColumn()
    medicine:number;

    @Column({ type: Number })
    @IsString()
    quantity:number;
}
