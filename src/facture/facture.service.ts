import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facture } from './facture.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class FactureService {

    constructor(@InjectRepository(Facture) private factureRepository: Repository<Facture>) { }

    async getFactures(): Promise<Facture[]> {
        return await this.factureRepository.find();
    }

    async getFactureById(id: number): Promise<Facture> {
        // tslint:disable-next-line: no-shadowed-variable
        const Facture: Facture | undefined = await this.factureRepository.findOne({
            where: [{ id }]
        });

        if (!Facture) {
            throw new NotFoundException('Cet utilisateur n\'existe pas');
        }
        return Facture;
    }

    async createFacture(facture: Partial<Facture>): Promise<Facture> {
        const factureCreated: Facture = this.factureRepository.create(facture);
        return this.factureRepository.save(factureCreated);
    }

    async updateFacture(id: number, facture: Partial<Facture>): Promise<Facture> {

        const result: UpdateResult = await this.factureRepository.update(id, facture);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('Ce médicament n\'existe pas.');
        }
        return await this.getFactureById(id);
    }

    async deleteFacture(id: number): Promise<void> {
        const facture: Facture | undefined = await this.getFactureById(id);
        if (!facture) {
            throw new NotFoundException('Ce médicament n\'existe pas.');
        }
        await this.factureRepository.delete(facture.id);
    }

}
