import {Module} from '@nestjs/common';
import {DatabaseConfigModule} from '@app/core/database/database.module';
import {statesProviders} from './states.providers';
import {PaginationModule} from '@app/core/sequelize-paginator/pagination.module';
import {StatesService} from './states.service';
import {CitiesService} from '@modules/cities/cities.service';
import {citiesProviders} from '@modules/cities/cities.providers';
import {StatesController} from './states.controller';

@Module({
  imports: [DatabaseConfigModule, PaginationModule.forRoot({limit: 15})],
  controllers: [StatesController],
  providers: [StatesService, CitiesService, ...statesProviders, ...citiesProviders],
  exports: [StatesService],
})
export class StatesModule {}
