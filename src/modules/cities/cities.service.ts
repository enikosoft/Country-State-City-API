import {citiesRepo} from '@app/core/constants/repo-tockens';
import {CityList} from './types';
import {City} from './entities/city.entity';
import {GenerateJsonDto} from '@app/core/utils/generateFileName';
import {Inject, Injectable} from '@nestjs/common';
import {PaginationService} from '@app/core/sequelize-paginator/pagination.service';
import {PaginationQuery, PaginationResponse, SortOrderOptions} from '@app/core/sequelize-paginator/pagination.entity';
import {Includeable} from 'sequelize/types';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(citiesRepo) private citiesRepository: typeof City,
    private paginationService: PaginationService,
  ) {}

  async getAll(
    paginationOptions: PaginationQuery,
    include: Includeable | Includeable[] = [],
  ): Promise<PaginationResponse<City[]>> {
    paginationOptions.sortBy = paginationOptions.sortBy || 'name';
    paginationOptions.sortOrder = paginationOptions.sortOrder || SortOrderOptions.Asc;

    return this.paginationService.findAll(
      {...paginationOptions, model: City},
      {
        include,
        attributes: ['id', 'name', 'latitude', 'longitude'],
        order: [[paginationOptions.sortBy, paginationOptions.sortOrder]],
      },
      citiesRepo,
      false,
      true
    );
  }

  async getCitiesByStateId(id: string): Promise<CityList[]> {
    return this.citiesRepository.findAll({
      //@ts-ignore
      where: {stateId: Number(id)},
      attributes: ['id', 'name', 'stateCode'],
    });
  }

  async generateJson(generateJsonDto: GenerateJsonDto) {
    return await this.citiesRepository.findAll({
      where: {countryId: 230},
    });
  }
}
