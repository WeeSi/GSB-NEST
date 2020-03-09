import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()

// tslint:disable-next-line: class-name
export class Medicament {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    nom = '';

    @Column({ type: String })
    @IsString()
    description = '';

    @Column({ type: String })
    @IsString()
    img = '';

    // @Column({ type: Number })
    // @IsNumber()
    // vendeur = '';
}
