import { CreateFactureDto } from '../model/createFactureDto';
import { Facture } from '../facture.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

// tslint:disable-next-line: class-name
export class createFactureDtoConverter implements Converter<CreateFactureDto, Partial<Facture>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(facture: CreateFactureDto): Partial<Facture> {
        const factureToCreate = {
            prix_hotel: facture.prix_hotel,
            description: facture.description,
            prix_repas:facture.prix_repas,
            nombre_kilometre: facture.nombre_kilometre,
            prix_transport: facture.prix_transport,
            date: facture.date
        };

        return factureToCreate;
    }
}