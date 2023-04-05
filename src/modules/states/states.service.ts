import {Inject, Injectable} from '@nestjs/common';
import {statesRepo} from '@app/core/constants/repo-tockens';
import {StateList} from './types';
import {State} from './entities/state.entity';
import {GenerateJsonDto} from '@app/core/utils/generateFileName';
import {City} from '@modules/cities/entities/city.entity';

@Injectable()
export class StatesService {
  constructor(@Inject(statesRepo) private statesRepository: typeof State) {}

  async getStatesByCountryId(id: string): Promise<StateList[]> {
    return this.statesRepository.findAll({
      //@ts-ignore
      where: {countryId: Number(id)},
      attributes: ['id', 'name', 'iso2'],
    });
  }

  async generateJson(generateJsonDto: GenerateJsonDto) {
    const {states, cities} = generateJsonDto;

    const include = [];

    // add states and maybe cities
    if (cities) {
      include.push({
        model: City,
      });
    }

    return await this.statesRepository.findAll({
      where: {countryId: 230},
      include,
    });
  }
}
