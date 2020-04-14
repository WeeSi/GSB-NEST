import { Converter } from 'src/common/converter';
import { PaginatedDto } from './dto/paginated.dto';

export class PaginatedDtoConverter implements Converter<PaginatedDto<any>, [any[], number]> {
    constructor() {}

    convertOutbound([elements, nbElements]: [any[], number]): PaginatedDto<any> {
        return { elements, nbElements };
    }
}