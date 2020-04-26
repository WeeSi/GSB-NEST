import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facture } from './facture.entity';
import { Repository, UpdateResult, Like } from 'typeorm';
import { FactureDto } from './model/facture.dto';

@Injectable()
export class FactureService {

    constructor(@InjectRepository(Facture) private factureRepository: Repository<Facture>) { }

    async getFactures(date: string, commercial: number, doctor: number): Promise<Facture[]> {

        if(commercial == -1 && doctor == -1){ 
            return await this.factureRepository.find({
                where : [{date : Like(`%${date}%`)}],
                relations: ['commercialId', 'doctor', 'orders']
            });
        }else{
            if(commercial != -1){
                return await this.factureRepository.find({
                    where : [{date : Like(`%${date}%`), doctor : doctor}],
                    relations: ['commercialId', 'doctor', 'orders']
                });
            }
            if(doctor != -1){
                return await this.factureRepository.find({
                    where : [{date : Like(`%${date}%`), commercialId : commercial}],
                    relations: ['commercialId', 'doctor', 'orders'],
                });
            }
        }

    }

    async getFactureById(id: number): Promise<Facture> {
        // tslint:disable-next-line: no-shadowed-variable
        const Facture: Facture | undefined = await this.factureRepository.findOne({
            where: [{ id }],
            relations: ['commercialId', 'doctor', 'orders']
        });

        if (!Facture) {
            throw new NotFoundException('Cet utilisateur n\'existe pas');
        }
        return Facture;
    }

    async getFacturesFromDoctor(id:number): Promise<Facture[]>{
        return this.factureRepository.find({
            where : [{doctor : id}],
            relations: ['commercialId', 'orders']
        });
    }

    async createFacture(facture: Partial<Facture>): Promise<Facture> {
        const factureCreated: Facture = this.factureRepository.create(facture);
        return this.factureRepository.save(factureCreated);
    }

    async updateFacture(id: number, facture: Partial<Facture>): Promise<Facture> {

        const result: UpdateResult = await this.factureRepository.update(id, facture);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('Cette facture n\'existe pas.');
        }
        return await this.getFactureById(id);
    }

    async deleteFacture(id: number): Promise<void> {
        const facture: Facture | undefined = await this.getFactureById(id);
        if (!facture) {
            throw new NotFoundException('Cette facture n\'existe pas.');
        }
        await this.factureRepository.delete(facture.id);
    }

}
