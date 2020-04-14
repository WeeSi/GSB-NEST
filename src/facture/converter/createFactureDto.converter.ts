
import { Converter } from '../../common/converter';
import { CreateFactureDto } from '../model/createFactureDto';
import { Facture } from '../facture.entity';

export class CreateFactureDtoConverter implements Converter<CreateFactureDto, Partial<Facture>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(facture: CreateFactureDto): Partial<Facture> {
        const factureToCreate = {
                doctor: facture.doctor,
                commercialId : facture.commercialId,
                orders : facture.orders,
                date : facture.date
        }

        return factureToCreate;
    }
}