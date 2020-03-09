import { Module } from '@nestjs/common';
import { FactureController } from './facture.controller';
import { FactureService } from './facture.service';
import { FactureDtoConverter } from './converter/factureDto.converter';
import { Facture } from './facture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactureDto } from './model/facture.dto';
import { CreateFactureDto } from './model/createFactureDto';
import { createFactureDtoConverter } from './converter/createFactureDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Facture])],
  controllers: [FactureController],
  providers: [
    FactureService,
    FactureDtoConverter,
    createFactureDtoConverter,
],
exports: [
    FactureService,
    FactureDtoConverter,
    createFactureDtoConverter,
  ],
})
export class FactureModule {}
