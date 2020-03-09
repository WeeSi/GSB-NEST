import { Module } from '@nestjs/common';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';
import { MedicamentDtoConverter } from './converter/medicamentDto.converter';
import { Medicament } from './medicament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentDto } from './model/medicament.dto';
import { CreateMedicamentDto } from './model/createMedicamentDto';
import { createMedicamentDtoConverter } from './converter/createMedicamentDto.convert';

@Module({
  imports: [TypeOrmModule.forFeature([Medicament])],
  controllers: [MedicamentController],
  providers: [
    MedicamentService,
    MedicamentDtoConverter,
    createMedicamentDtoConverter,
],
exports: [
    MedicamentService,
    MedicamentDtoConverter,
    createMedicamentDtoConverter,
  ],
})
export class MedicamentModule {}
