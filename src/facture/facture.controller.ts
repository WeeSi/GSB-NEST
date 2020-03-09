import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Facture } from './facture.entity';
import { FactureService } from './facture.service';
import { FactureDto } from './model/facture.dto';
import { FactureDtoConverter } from './converter/factureDto.converter';
import { CreateFactureDto } from './model/createFactureDto';
import { createFactureDtoConverter } from './converter/createFactureDto.converter';

@ApiUseTags('factures')
@Controller('factures')
export class FactureController {

    constructor( private readonly service: FactureService,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly FactureDtoConverter: FactureDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createFactureDtoConverter: createFactureDtoConverter) {}

    @Get('')
    @ApiResponse({ status: 201, description: 'All factures', type: FactureDto, isArray: true})
    @ApiResponse({ status: 401, description: 'Error!'})
    async getAll(): Promise<FactureDto[]> {
        const facture: Facture[] = await this.service.getFactures();
        return this.FactureDtoConverter.convertOutboundCollection(facture);
    }

    @UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'Facture id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Facture found', type: FactureDto})
    @ApiResponse({ status: 401, description: 'Facture not Error!'})
    @ApiResponse({ status: 404, description: 'Facture not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<FactureDto> {
        const facture: Facture = await this.service.getFactureById(id);
        return this.FactureDtoConverter.convertOutbound(facture);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateFactureDto', description: 'Facture to create', type: CreateFactureDto})
    @ApiResponse({ status: 201, description: 'Facture found', type: FactureDto})
    @ApiResponse({ status: 401, description: 'Facture not Error!'})
    async create(@Body() medicament: CreateFactureDto): Promise<FactureDto> {
        const medicamentToCreate: Partial<FactureDto> = this.createFactureDtoConverter.convertInbound(medicament);
        const createFacture: Facture = await this.service.createFacture(medicamentToCreate);
        return this.FactureDtoConverter.convertOutbound(createFacture);
    }
    
    @UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'Facture id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Facture deleted'})
    @ApiResponse({ status: 401, description: 'Facture not Error!'})
    @ApiResponse({ status: 404, description: 'Facture not found'})
    async deleteMedicament(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteFacture(id);
    }

}
