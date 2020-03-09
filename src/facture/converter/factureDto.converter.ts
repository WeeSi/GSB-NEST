import { FactureDto } from '../model/facture.dto';
import { Facture } from '../facture.entity';
import { Converter } from '../../common/converter';

export class FactureDtoConverter implements Converter<FactureDto, Facture>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertOutbound(facture: Facture): FactureDto {
        // tslint:disable-next-line: no-shadowed-variable
        const FactureDto: FactureDto = {
            id: facture.id,
            date: facture.date,
            prix_hotel: facture.prix_hotel,
            prix_repas: facture.prix_repas,
            prix_transport: facture.prix_transport,
            nombre_kilometre: facture.nombre_kilometre,
            description: facture.description
        };

        return FactureDto;
    }

    // tslint:disable-next-line: no-shadowed-variable
    convertOutboundCollection(Facture: Facture[]): FactureDto[] {
        return Facture.map((facture) => this.convertOutbound(facture));
    }
}