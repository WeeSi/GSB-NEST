import { CategorieDto } from '../model/categorie.dto';
import { Medicament } from '../medicament.entity';
import { Converter } from '../../common/converter';

export class CategorieDtoConverter implements Converter<CategorieDto, Medicament>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertOutbound(categorie: Medicament): CategorieDto {
        // tslint:disable-next-line: no-shadowed-variable
        const CategorieDto: CategorieDto = {
            id:categorie.id,
            categorie : categorie.categorie
        };
        return CategorieDto;
    }

    // tslint:disable-next-line: no-shadowed-variable
    convertOutboundCollection(Categorie: Medicament[]): CategorieDto[] {
        return Categorie.map((categorie) => this.convertOutbound(categorie));
    }
}
