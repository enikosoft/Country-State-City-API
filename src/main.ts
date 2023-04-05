if (!process.env.IS_TS_NODE) {
  // tslint:disable-next-line:no-var-requires
  require('module-alias/register');
}

import {AppModule} from '@app/app.module';
import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as fs from 'fs';
import * as cors from 'cors';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ExpressAdapter} from '@nestjs/platform-express/adapters/express-adapter';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import * as https from 'https';

async function bootstrap() {
  const logger = new Logger('Bootstrapper');

  const httpsOptions = {
    key: fs.readFileSync('./newfile.key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };

  //const server = express();

  const app = await NestFactory.create(AppModule, {httpsOptions, cors: true});

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Service for geo data.')
    .setDescription('This service allows get country/state/city data with additional information.')
    .setVersion('0.0.1')
    .addTag('GEONIKO service')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.init();

  app.enableCors();

  const config = app.get<ConfigService>(ConfigService);
  const appConfig = config.get('app');

  app.use(cors());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  // global prefix
  app.setGlobalPrefix(`api/v${process.env.VERSION}`);

  // http.createServer(server).listen(8000);
  // https.createServer(httpsOptions, server).listen(8080);

  console.log('-====, app', appConfig.port);
  await app.listen(appConfig.port);
  logger.log(`App listening on port ${appConfig.port}`);
}
bootstrap();
