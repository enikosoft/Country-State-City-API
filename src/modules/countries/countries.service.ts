import {Inject, Injectable} from '@nestjs/common';
import {Country} from './entities/country.entity';
import {countriesRepo} from '@app/core/constants/repo-tockens';
import {CountryShort} from './types';
import {PaginationService} from '@app/core/sequelize-paginator/pagination.service';
import {PaginationQuery, PaginationResponse, SortOrderOptions} from '@app/core/sequelize-paginator/pagination.entity';
import {Includeable} from 'sequelize/types';
import {Op} from 'sequelize'
import {State} from '@modules/states/entities/state.entity';
import {Language} from '@modules/languages/entities/language.entity';
import {City} from '@modules/cities/entities/city.entity';
import {GenerateJsonDto} from '@app/core/utils/generateFileName';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(countriesRepo) private countriesRepository: typeof Country,
    private paginationService: PaginationService,
  ) {}

  async getShortList(
    paginationOptions: PaginationQuery,
    include: Includeable | Includeable[] = [],
  ): Promise<PaginationResponse<CountryShort[]>> {
    paginationOptions.sortBy = paginationOptions.sortBy || 'name';
    paginationOptions.sortOrder = paginationOptions.sortOrder || SortOrderOptions.Asc;

    return this.paginationService.findAll(
      {...paginationOptions, model: Country},
      {
        include,
        attributes: ['id', 'name', 'iso3', 'native', 'phoneCode', 'postalCodeFormat', 'postalCodeRegex'],
        order: [[paginationOptions.sortBy, paginationOptions.sortOrder]],
      },
      countriesRepo,
    );
  }

  async getList(
    paginationOptions: PaginationQuery,
    include: Includeable | Includeable[] = [],
  ): Promise<PaginationResponse<Country[]>> {
    paginationOptions.sortBy = paginationOptions.sortBy || 'name';
    paginationOptions.sortOrder = paginationOptions.sortOrder || SortOrderOptions.Asc;

    return this.paginationService.findAll(
      {...paginationOptions, model: Country},
      {
        include,

        order: [[paginationOptions.sortBy, paginationOptions.sortOrder]],
      },
      countriesRepo,
    );
  }

  async generateJson(createCategoryDto: GenerateJsonDto) {
    const {states, cities} = createCategoryDto;

    const include = [];

    // add languages
    // include.push({
    //   model: Language,
    //   through: {attributes: []}, // exclude `CountryLanguages` association
    // });

    // add states and maybe cities
    if (states) {
      include.push({
        model: State,
        ...(cities ? {include: [City]} : {}),
      });
    }

    // add cities
    if (!states && cities) {
      include.push({
        model: City,
        attributes: ['id', 'name', 'countryCode', 'latitude', 'longitude'],
        where: {
          //name: 'Kyiv'
          name: {[Op.col]: 'Country.capital'}
        }
      });
    }

    return await this.countriesRepository.findAll({
      where: {region: 'Europe'},
      attributes: ['id', 'name', 'region', 'iso3', 'capital'],
      include,
    });
  }
}
