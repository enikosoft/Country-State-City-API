import {LIMIT, OFFSET} from '@app/core/sequelize-paginator/pagination.constants';
import {Pagination} from '@app/core/sequelize-paginator/pagination.decorator';
import {PaginationQuery, PaginationResponse} from '@app/core/sequelize-paginator/pagination.entity';
import {Language} from '@modules/languages/entities/language.entity';
import {StatesService} from '@modules/states/states.service';
import {StateList} from '@modules/states/types';
import {Controller, Get, ValidationPipe, HttpStatus, Param, Body, Res, HttpCode, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CountriesService} from './countries.service';
import {Country} from './entities/country.entity';
import PaginationSwaggerResponse from './entities/swagger.entity';
import {CountryShort} from './types';
import * as fs from 'fs';
import {generateFileName} from '@app/core/utils/generateFileName';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService, private readonly statesService: StatesService) {}

  @ApiTags('countries')
  @ApiOperation({summary: 'Get list of countries with limited fields.'})
  @ApiResponse({status: HttpStatus.OK, type: PaginationSwaggerResponse})
  @Get('/list')
  async getShortList(
    @Pagination(new ValidationPipe({validateCustomDecorators: true}), {offset: OFFSET, limit: LIMIT})
    pagination: PaginationQuery,
  ): Promise<PaginationResponse<CountryShort[]>> {
    return this.countriesService.getShortList(pagination, []);
  }

  @ApiTags('countries')
  @ApiOperation({summary: 'Get list of countries with all fields.'})
  @ApiResponse({status: HttpStatus.OK, type: PaginationSwaggerResponse})
  @Get('/')
  async getList(
    @Pagination(new ValidationPipe({validateCustomDecorators: true}), {offset: OFFSET, limit: LIMIT})
    pagination: PaginationQuery,
  ): Promise<PaginationResponse<Country[]>> {
    return this.countriesService.getList(pagination, [
      {
        model: Language,
        attributes: ['iso2', 'name', 'nativeName'],
        through: {attributes: []}, // exclude `CountryLanguages` association
      },
    ]);
  }

  @ApiTags('states')
  @ApiOperation({summary: 'Get list of states by country id.'})
  @ApiResponse({status: HttpStatus.OK, type: PaginationSwaggerResponse})
  @Get('/:id/states')
  async getStatesByCountryId(@Param('id') id: string): Promise<StateList[]> {
    return this.statesService.getStatesByCountryId(id);
  }
}
