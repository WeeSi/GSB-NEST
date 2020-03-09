import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Medicament } from './medicament.entity';
import { MedicamentService } from './medicament.service';
import { MedicamentDto } from './model/medicament.dto';
import { MedicamentDtoConverter } from './converter/medicamentDto.converter';
import { CreateMedicamentDto } from './model/createMedicamentDto';
import { createMedicamentDtoConverter } from './converter/createMedicamentDto.convert';

@ApiUseTags('medicaments')
@Controller('medicaments')
export class MedicamentController {

    constructor( private readonly service: MedicamentService,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly MedicamentDtoConverter: MedicamentDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createMedicamentDtoConverter: createMedicamentDtoConverter) {}

    @Get('')
    @ApiResponse({ status: 201, description: 'All medicaments', type: MedicamentDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getAll(): Promise<MedicamentDto[]> {
        const medicaments: Medicament[] = await this.service.getMedicaments();
        return this.MedicamentDtoConverter.convertOutboundCollection(medicaments);
    }

    @UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User found', type: MedicamentDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<MedicamentDto> {
        const medicaments: Medicament = await this.service.getMedicamentsById(id);
        return this.MedicamentDtoConverter.convertOutbound(medicaments);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateMedicamentDto', description: 'User to create', type: CreateMedicamentDto})
    @ApiResponse({ status: 201, description: 'User found', type: MedicamentDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async create(@Body() medicament: CreateMedicamentDto): Promise<MedicamentDto> {
        const medicamentToCreate: Partial<Medicament> = this.createMedicamentDtoConverter.convertInbound(medicament);
        const createdMedicament: Medicament = await this.service.createMedicament(medicamentToCreate);
        return this.MedicamentDtoConverter.convertOutbound(createdMedicament);
    }
    
    @UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User deleted'})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async deleteMedicament(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteMedicament(id);
    }

}
