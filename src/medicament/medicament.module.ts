import { Module } from '@nestjs/common';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';
import { MedicamentDtoConverter } from './converter/medicamentDto.converter';
import { Medicament } from './medicament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createMedicamentDtoConverter } from './converter/createMedicamentDto.convert';
import { CommonModule } from './../common/common.module';
import { UpdateMedicamentDtoConverter } from './converter/updateMedicamentDto.converter';
import { UpdateMedicamentDto } from './model/updateMedicament.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicament]),
    CommonModule,
  ],
  controllers: [MedicamentController],
  providers: [
    MedicamentService,
    MedicamentDtoConverter,
    createMedicamentDtoConverter,
    UpdateMedicamentDtoConverter
],
exports: [
    MedicamentService,
    MedicamentDtoConverter,
    createMedicamentDtoConverter,
  ],
})
export class MedicamentModule {}
