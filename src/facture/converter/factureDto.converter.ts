import { UserDto } from 'src/user/model/user.dto';
import { Converter } from '../../common/converter';
import { Facture } from './../facture.entity';
import { FactureDto} from './../model/facture.dto';

export class FactureDtoConverter implements Converter<FactureDto, Facture> {

    constructor() {}

    convertInbound(facture: FactureDto): Facture {
        return {
            id: facture.id,
            commercialId : facture.commercialId.id,
            doctor : facture.doctor.id,
            orders:facture.orders,
            date : facture.date
        };
    }

    convertOutbound(facture: Facture): FactureDto {
        return {
            id: facture.id,
            commercialId: facture.commercialId as Partial<UserDto>,
            doctor: facture.doctor as Partial<UserDto>,
            date: facture.date,
            orders : facture.orders
        };
    }

    convertOutboundCollection(facture: Facture[]): FactureDto[] {
        return facture.map((m) => this.convertOutbound(m));
    }
}