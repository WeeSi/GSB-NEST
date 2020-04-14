import { Module } from '@nestjs/common';
import { FactureController } from './facture.controller';
import { FactureService } from './facture.service';
import { FactureDtoConverter } from './converter/factureDto.converter';
import { Facture } from './facture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFactureDtoConverter } from './converter/createFactureDto.converter';
import { updateFactureDtoConverter } from './converter/updateFactureDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Facture])],
  controllers: [FactureController],
  providers: [
    FactureService,
    FactureDtoConverter,
    CreateFactureDtoConverter,
    updateFactureDtoConverter
],
exports: [
    FactureService,
    FactureDtoConverter,
    CreateFactureDtoConverter,
  ],
})
export class FactureModule {}
