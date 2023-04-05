import {LIMIT, OFFSET} from '@app/core/sequelize-paginator/pagination.constants';
import {Pagination} from '@app/core/sequelize-paginator/pagination.decorator';
import {PaginationQuery, PaginationResponse} from '@app/core/sequelize-paginator/pagination.entity';
import {Country} from '@modules/countries/entities/country.entity';
import PaginationSwaggerResponse from '@modules/countries/entities/swagger.entity';
import {Language} from '@modules/languages/entities/language.entity';
import {Controller, Get, ValidationPipe, HttpStatus} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CitiesService} from './cities.service';
import {City} from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiTags('cities')
  @ApiOperation({summary: 'Get list of cities with fields.'})
  @ApiResponse({status: HttpStatus.OK, type: PaginationSwaggerResponse})
  @Get('/')
  async getList(
    @Pagination(new ValidationPipe({validateCustomDecorators: true}), {offset: OFFSET, limit: LIMIT})
    pagination: PaginationQuery,
  ): Promise<PaginationResponse<City[]>> {
    return this.citiesService.getAll(pagination, [
      {
        model: Country,
        attributes: ['name'],
        // through: {attributes: []}, // exclude `CountryLanguages` association
      },
    ]);
  }
}
