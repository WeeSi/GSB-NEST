import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';
import { Medicament } from './medicament.entity';
import { MedicamentService } from './medicament.service';
import { MedicamentDto } from './model/medicament.dto';
import { MedicamentDtoConverter } from './converter/medicamentDto.converter';
import { CreateMedicamentDto } from './model/createMedicamentDto';
import { createMedicamentDtoConverter } from './converter/createMedicamentDto.convert';
import { PaginatedDtoConverter } from './../common/paginated.converter';
import { PaginatedDto } from './../common/dto/paginated.dto';
import { UpdateMedicamentDto } from './model/updateMedicament.dto';
import { UpdateMedicamentDtoConverter } from './converter/updateMedicamentDto.converter';
import { CategorieDto } from './model/categorie.dto';
import { CategorieDtoConverter } from './converter/categorieDto.converter';

@ApiUseTags('medicaments')
@Controller('medicaments')
export class MedicamentController {

    constructor( private readonly service: MedicamentService,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly MedicamentDtoConverter: MedicamentDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createMedicamentDtoConverter: createMedicamentDtoConverter,

                 private readonly updateMedicamentDtoConverter:UpdateMedicamentDtoConverter,

                 private readonly PaginatedDtoConverter : PaginatedDtoConverter,
                 
                 private readonly categorieDtoConverter : CategorieDtoConverter) {}

    @Get('')
    @ApiImplicitQuery({name :'pageIndex', type: Number, description : 'Page index for pagination'})
    @ApiImplicitQuery({name :'pageSize', type: Number, description : 'Page size for pagination'})
    @ApiImplicitQuery({name :'search', type: String, description : 'Page index for pagination'})
    @ApiImplicitQuery({name :'categorie', type: String, description : 'Categorie of medicine'})
    @ApiImplicitQuery({name :'commercial', type: Number, description : 'Commercial of medicine'})
    @ApiResponse({ status: 201, description: 'All medicaments', type: PaginatedDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getAll(
        @Query('pageIndex', new ParseIntPipe()) pageIndex: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number,
        @Query('search') search: string,
        @Query('categorie') categorie: string,
        @Query('commercial', new ParseIntPipe()) commercial: number,
    ): Promise<PaginatedDto<MedicamentDto[]>> {
        const [medicaments, nbMedicaments] = await this.service.getMedicaments(pageIndex,pageSize,search, categorie, commercial);
        const medicamentDto: MedicamentDto[] = this.MedicamentDtoConverter.convertOutboundCollection(medicaments);
        return this.PaginatedDtoConverter.convertOutbound([medicamentDto, nbMedicaments]);
    }

    @Get('categories')
    @ApiResponse({ status: 201, description: 'All categories', type: CategorieDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getCategories(): Promise<CategorieDto[]> {
        const categories : Medicament[] = await this.service.getCategories();
        return this.categorieDtoConverter.convertOutboundCollection(categories);
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

    @UseGuards(AuthGuard('auth'))
    @Get('/com/:id')
    @ApiImplicitParam({name: 'id', description: 'User id to retrieve', required: true, type: Number})
    @ApiImplicitQuery({name :'medicineName', type: String, description : 'Medicine Name'})
    @ApiImplicitQuery({name :'medicineCategorie', type: String, description : 'Medicine Categorie'})
    @ApiResponse({ status: 201, description: 'User found', type: MedicamentDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async getComMedicines(
        @Param('id', new ParseIntPipe()) id: number,
        @Query('medicineName') medicineName: string,
        @Query('medicineCategorie') medicineCategorie: string,
        ): Promise<MedicamentDto[]> {
        const medicaments: Medicament[] = await this.service.getMedicamentsByIdCom(id, medicineName, medicineCategorie);
        return this.MedicamentDtoConverter.convertOutboundCollection(medicaments);
    }

    @UseGuards(AuthGuard('auth'))
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
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateUserDto', description: 'User information to update', type: UpdateMedicamentDto})
    @ApiResponse({ status: 201, description: 'User updated', type: MedicamentDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() medicament: UpdateMedicamentDto): Promise<MedicamentDto> {
        const medicamentToUpdate: Partial<Medicament> = this.updateMedicamentDtoConverter.convertInbound(medicament);
        const medicamentUpdated: Medicament = await this.service.updateMedicament(id, medicamentToUpdate);
        return this.MedicamentDtoConverter.convertOutbound(medicamentUpdated);
    }

    @UseGuards(AuthGuard('auth'))
    @Post(':userId/doctor/:doctorId')
    @ApiImplicitParam({name: 'id', description: 'User id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateUserDto', description: 'User information to update', type: UpdateMedicamentDto})
    @ApiResponse({ status: 201, description: 'User updated', type: MedicamentDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async addMedicamentDoctor(@Param('id', new ParseIntPipe()) id: number, @Body() medicament: UpdateMedicamentDto): Promise<MedicamentDto> {
        const medicamentToUpdate: Partial<Medicament> = this.updateMedicamentDtoConverter.convertInbound(medicament);
        const medicamentUpdated: Medicament = await this.service.updateMedicament(id, medicamentToUpdate);
        return this.MedicamentDtoConverter.convertOutbound(medicamentUpdated);
    }
    
    @UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'medicament id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'medicament deleted'})
    @ApiResponse({ status: 401, description: 'medicament not authentificated'})
    @ApiResponse({ status: 404, description: 'medicament not found'})
    async deleteMedicament(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteMedicament(id);
    }

}
