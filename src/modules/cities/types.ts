import {City} from './entities/city.entity';

export interface CityList extends Pick<City, 'id' | 'name' | 'stateCode'> {}
