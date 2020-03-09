import { MedicamentDto } from '../model/medicament.dto';
import { Medicament } from '../medicament.entity';
import { Converter } from '../../common/converter';

export class MedicamentDtoConverter implements Converter<MedicamentDto, Medicament>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertOutbound(medicament: Medicament): MedicamentDto {
        // tslint:disable-next-line: no-shadowed-variable
        const MedicamentDto: MedicamentDto = {
            id:medicament.id,
            nom: medicament.nom,
            description: medicament.description,
            img: medicament.img,
        };

        return MedicamentDto;
    }

    // tslint:disable-next-line: no-shadowed-variable
    convertOutboundCollection(Medicament: Medicament[]): MedicamentDto[] {
        return Medicament.map((medicament) => this.convertOutbound(medicament));
    }
}
