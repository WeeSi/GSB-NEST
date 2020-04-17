import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Facture } from './facture.entity';
import { FactureService } from './facture.service';
import { FactureDto } from './model/facture.dto';
import { FactureDtoConverter } from './converter/factureDto.converter';
import { CreateFactureDto } from './model/createFactureDto';
import { CreateFactureDtoConverter } from './converter/createFactureDto.converter';
import { updateFactureDtoConverter } from './converter/updateFactureDto.converter';
import { UpdateFactureDto } from './model/updateFacture.dto';

@ApiUseTags('factures')
@Controller('factures')
export class FactureController {

    constructor( private readonly service: FactureService,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly FactureDtoConverter: FactureDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createFactureDtoConverter: CreateFactureDtoConverter,
                 private readonly updateFactureDtoConverter: updateFactureDtoConverter) {}

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

    @UseGuards(AuthGuard('auth'))
    @Get('doctor/:id')
    @ApiImplicitParam({name: 'id', description: 'Facture from doctorId to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'Facture found', type: FactureDto})
    @ApiResponse({ status: 401, description: 'Facture not Error!'})
    @ApiResponse({ status: 404, description: 'Facture not found'})
    async getFacturesByDoctor(@Param('id', new ParseIntPipe()) id: number): Promise<FactureDto[]> {
        const factures: Facture[] = await this.service.getFacturesFromDoctor(id);
        return this.FactureDtoConverter.convertOutboundCollection(factures);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateFactureDto', description: 'Facture to create', type: CreateFactureDto})
    @ApiResponse({ status: 201, description: 'Facture found', type: FactureDto})
    @ApiResponse({ status: 401, description: 'Facture not Error!'})
    async create(@Body() medicament: CreateFactureDto): Promise<FactureDto> {
        const factureToCreate: Partial<Facture> = this.createFactureDtoConverter.convertInbound(medicament);
        const createFacture: Facture = await this.service.createFacture(factureToCreate);
        return this.FactureDtoConverter.convertOutbound(createFacture);
    }

    @UseGuards(AuthGuard('auth'))
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'Facture id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateFactureDto', description: 'Facture information to update', type: UpdateFactureDto})
    @ApiResponse({ status: 201, description: 'Facture updated', type: FactureDto})
    @ApiResponse({ status: 401, description: 'Facture not authentificated'})
    @ApiResponse({ status: 404, description: 'Facture not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() Facture: UpdateFactureDto): Promise<FactureDto> {
        const FactureToUpdate: Partial<Facture> = this.updateFactureDtoConverter.convertInbound(Facture);
        const FactureUpdated: Facture = await this.service.updateFacture(id, FactureToUpdate);
        return this.FactureDtoConverter.convertOutbound(FactureUpdated);
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
