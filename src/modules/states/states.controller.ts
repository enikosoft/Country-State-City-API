import {CitiesService} from '@modules/cities/cities.service';
import {CityList} from '@modules/cities/types';
import PaginationSwaggerResponse from '@modules/countries/entities/swagger.entity';
import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@Controller('states')
export class StatesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiTags('cities')
  @ApiOperation({summary: 'Get list of cities based on state id.'})
  @ApiResponse({status: HttpStatus.OK, type: PaginationSwaggerResponse})
  @Get('/:id/cities')
  async getCitiesByStateId(@Param('id') id: string): Promise<CityList[]> {
    return this.citiesService.getCitiesByStateId(id);
  }
}
