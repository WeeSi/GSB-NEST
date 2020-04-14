import { Converter } from 'src/common/converter';
import { UpdateMedicamentDto } from '../model/updateMedicament.dto';
import { Medicament } from '../medicament.entity';

export class UpdateMedicamentDtoConverter implements Converter<UpdateMedicamentDto, Partial<Medicament>>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(medicament: UpdateMedicamentDto): Partial<Medicament> {
        return medicament as Partial<Medicament>;
    }
}