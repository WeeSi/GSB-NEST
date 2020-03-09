import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicament } from './medicament.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class MedicamentService {

    constructor(@InjectRepository(Medicament) private medicamentRepository: Repository<Medicament>) { }

    async getMedicaments(): Promise<Medicament[]> {
        return await this.medicamentRepository.find();
    }

    async getMedicamentsById(id: number): Promise<Medicament> {
        // tslint:disable-next-line: no-shadowed-variable
        const Medicament: Medicament | undefined = await this.medicamentRepository.findOne({
            where: [{ id }]
        });

        if (!Medicament) {
            throw new NotFoundException('Cet utilisateur n\'existe pas');
        }
        return Medicament;
    }

    async createMedicament(medicament: Partial<Medicament>): Promise<Medicament> {
        const medicamentCreated: Medicament = this.medicamentRepository.create(medicament);
        return this.medicamentRepository.save(medicamentCreated);
    }

    async updateMedicament(id: number, medicament: Partial<Medicament>): Promise<Medicament> {

        const result: UpdateResult = await this.medicamentRepository.update(id, medicament);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException('Ce médicament n\'existe pas.');
        }
        return await this.getMedicamentsById(id);
    }

    async deleteMedicament(id: number): Promise<void> {
        const medicament: Medicament | undefined = await this.getMedicamentsById(id);
        if (!medicament) {
            throw new NotFoundException('Ce médicament n\'existe pas.');
        }
        await this.medicamentRepository.delete(medicament.id);
    }

}
