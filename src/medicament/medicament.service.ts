import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicament } from './medicament.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Like } from "typeorm";
import { GroupOptions } from 'typeorm';

@Injectable()
export class MedicamentService {

    constructor(@InjectRepository(Medicament) private medicamentRepository: Repository<Medicament>) { }

    async getMedicaments(pageIndex:number,pageSize:number,search:string, categorie:string, commercial : number): Promise<[Medicament[], number]>  {

        var queryCateg:any;
        if(categorie == "Tout") {
             categorie = "";
             queryCateg = Like(`%${categorie}%`);
            }
        else 
             queryCateg = categorie;

        if(commercial != -1 ){
            return await this.medicamentRepository.findAndCount({
                where: [
                    { nom: Like(`%${search}%`),commercialID : commercial,categorie : queryCateg  },
                ],
                skip: pageIndex * pageSize,
                take: pageSize,
            });
        }else{
            return await this.medicamentRepository.findAndCount({
                where: [
                    { nom: Like(`%${search}%`),categorie : queryCateg},
                ],
                skip: pageIndex * pageSize,
                take: pageSize,
            });
        }
        
    }
            
        

    async getMedicamentByName(nom: string): Promise<Medicament> {
        return await this.medicamentRepository.findOne({
            where: [{ nom }],
        });
    }

    async nameExists(nom: string): Promise<boolean> {
        return !!await this.getMedicamentByName(nom);
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

    async getMedicamentsByIdCom(id: number, medicineName, medicineCategorie): Promise<Medicament[]> {
        return await this.medicamentRepository.find({
            where : [{commercialID : id, nom : medicineName, categorie : medicineCategorie}]
        })
    }

    async getCategories(): Promise<Medicament[]> {
        return await this.medicamentRepository.query('select categorie from test.medicament group by categorie ');
    }

    async createMedicament(medicament: Partial<Medicament>): Promise<Medicament> {

        const nameExists = await this.nameExists(medicament.nom);
        if (nameExists) {
            throw new ForbiddenException('Ce médicament existe déjà.');
        }
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
