import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

// tslint:disable-next-line: class-name
export class Facture {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: Number })
    @IsNumber()
    prix_repas: number;

    @Column({ type: Number })
    @IsNumber()
    prix_hotel: number;

    @Column({ type: Number })
    @IsNumber()
    prix_transport: number;

    @Column({ type: Number })
    @IsNumber()
    nombre_kilometre: number;

    @Column({ type: String })
    @IsString()
    date = '';

    @Column({ type: String })
    @IsString()
    description = '';

    // @Column({ type: Number })
    // @IsNumber()
    // doctorId = '';
}
