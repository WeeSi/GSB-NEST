import { CreateMedicamentDto } from '../model/createMedicamentDto';
import { Medicament } from '../medicament.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

// tslint:disable-next-line: class-name
export class createMedicamentDtoConverter implements Converter<CreateMedicamentDto, Partial<Medicament>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(medicament: CreateMedicamentDto): Partial<Medicament> {
        const medicamentToCreate = {
            nom: medicament.nom,
            description: medicament.description,
            img: medicament.img,
        };

        return medicamentToCreate;
    }
}