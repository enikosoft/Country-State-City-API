import {AppController} from '@app/app.controller';
import {AppService} from '@app/app.service';
import {DatabaseConfigModule} from '@app/core/database/database.module';
import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import configuration from '@app/core/app/configuration';
import {validate} from '@app/core/app/env.validation';
import {CountriesModule} from '@modules/countries/countries.module';
import {LanguagesModule} from '@modules/languages/languages.module';
import {StatesModule} from '@modules/states/states.module';
import {CitiesModule} from '@modules/cities/cities.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
      validate,
    }),
    DatabaseConfigModule,

    CountriesModule,
    StatesModule,
    CitiesModule,
    LanguagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer;
    //.apply(AuthenticationMiddleware)
    //.forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
