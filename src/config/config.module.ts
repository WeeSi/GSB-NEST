import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

export const configService: ConfigService = new ConfigService();

@Module({
  providers: [ConfigService],
})
export class ConfigModule {}
