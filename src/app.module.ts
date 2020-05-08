import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.module';
import { MedicamentModule } from './medicament/medicament.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { FactureModule } from './facture/facture.module';
import { MeetingModule } from './meeting/meeting.module';
import { OrderModule } from './order/order.module';

const typeOrmConfig: MysqlConnectionOptions = {
      type: 'mysql',
      host: configService.dbHost,
      port: configService.dbPort,
      username: configService.dbUserName,
      password: configService.dbPassword,
      database: configService.dbName,
      entities: ['src/**/**.entity{.ts,.js}'],
      logging: true,
      synchronize: !configService.isProd,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MulterModule.register({
      dest: './upload',
    }),
    AuthModule,
    UserModule,
    MedicamentModule,
    FactureModule,
    MeetingModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
