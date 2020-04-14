import { Converter } from 'src/common/converter';
import { UpdateFactureDto } from '../model/updateFacture.dto';
import { Facture } from '../facture.entity';

export class updateFactureDtoConverter implements Converter<UpdateFactureDto, Partial<Facture>>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(facture: UpdateFactureDto): Partial<Facture> {
        return facture as Partial<Facture>;
    }
}