import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as http from 'http';
import * as swaggerUi from 'swagger-ui-express';
import { ValidationPipe } from '@nestjs/common';
import { configService } from './config/config.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  //Autorise les requêtes cross domaine (de localhost:4200 à localhost:3000)
  app.enableCors({ origin: [`${configService.webProtocol}://${configService.webHostName}`] });

  //Définit un préfixe pour toutes les routes (/api)
  app.setGlobalPrefix(configService.apiBasePath);


  //Initialise et configure le swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('GSB')
    .setDescription('API for gsb')
    .setExternalDoc('Swagger document as JSON', '../swagger-json')
    .setVersion('1.0')
    .setSchemes(configService.swaggerProtocol)
    .addBearerAuth()
    .setHost(configService.swaggerHostName)
    .setBasePath(configService.apiBasePath)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('swagger', app, document, {
  customSiteTitle: 'My Gladys API Swagger',
  swaggerOptions: {
    displayOperationId: true,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
    docExpansion: 'none',
  },
  });

  //Définit la route sur laquelle l'interface graphique (swagger-ui) est disponible
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

  /**
   * Utilise un Pipe de validation qui permet de déclencher une exception (erreur avec un statut 400),
   * lorsque les paramètres d'entrée d'une route ne correspondent pas au type attendu
   * 
   * Exemple: POur la création d'un utilisateur si la valeur de gender est différente de 'Male' ou 'Female',
   * Cette route renverra une erreur 400
  */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Lance le serveur sur le port spécifié en paramètre (ici 3000)
   */
  await app.listen(process.env.PORT || 3000);

  /**
   * Crée un serveur sur le port 1336 qui permet de distribué le fichier swagger.json.
   * Ce fichier est utile en développement pour contruire les classes qui seront utilisées côté front pour communiquer avec le serveur. 
   * (grâce à ng-swagger-gen)
   * 
   * En utilisant ng-swagger-gen côté front, on peut automatiser la création des classes attendues et de celles retournées par le serveur.
   * (PI: il permet même de créer les services qui correspondent au controller déifnit côté serveur)
   */
  const server = express();
  server.get('/api/swagger.json', (req, res) => res.json(document));
  http.createServer(server).listen(1336);
}
bootstrap();