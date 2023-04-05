import {citiesRepo} from '@app/core/constants/repo-tockens';
import {City} from './entities/city.entity';

export const citiesProviders = [
  {
    provide: citiesRepo,
    useValue: City,
  },
];
