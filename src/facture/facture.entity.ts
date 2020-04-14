import { IsNumber, IsString, IsBoolean, IsJSON } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()

// tslint:disable-next-line: class-name
export class Facture {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    commercialId: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn()
    doctor: number;

    @Column({ type: Number })
    @IsNumber()
    orders: number;

    @Column({ type: String })
    @IsString()
    date: string;
}
