import {Module} from '@nestjs/common';
import {CountriesService} from './countries.service';
import {CountriesController} from './countries.controller';
import {DatabaseConfigModule} from '@app/core/database/database.module';
import {countriesProviders} from './countries.providers';
import {languagesProviders} from '@modules/languages/languages.provider';
import {PaginationModule} from '@app/core/sequelize-paginator/pagination.module';
import {statesProviders} from '@modules/states/states.providers';
import {StatesService} from '@modules/states/states.service';

@Module({
  imports: [DatabaseConfigModule, PaginationModule.forRoot({limit: 2})],
  controllers: [CountriesController],
  providers: [CountriesService, StatesService, ...countriesProviders, ...languagesProviders, ...statesProviders],
  exports: [CountriesService], //...countriesProviders
})
export class CountriesModule {}
