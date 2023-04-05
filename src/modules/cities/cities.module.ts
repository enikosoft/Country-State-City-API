import {Module} from '@nestjs/common';
import {DatabaseConfigModule} from '@app/core/database/database.module';
import {citiesProviders} from './cities.providers';
import {PaginationModule} from '@app/core/sequelize-paginator/pagination.module';
import {CitiesService} from './cities.service';
import {CitiesController} from './cities.controller';

@Module({
  imports: [DatabaseConfigModule, PaginationModule.forRoot({limit: 15})],
  controllers: [CitiesController],
  providers: [CitiesService, ...citiesProviders],
  exports: [CitiesService],
})
export class CitiesModule {}
