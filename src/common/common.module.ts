import { PaginatedDtoConverter } from './paginated.converter';
import { Module } from "@nestjs/common";

@Module({
    providers: [PaginatedDtoConverter],
    exports: [PaginatedDtoConverter]
})
export class CommonModule {}