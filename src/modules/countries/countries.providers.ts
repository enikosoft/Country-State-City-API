import {countriesRepo} from '@app/core/constants/repo-tockens';
import {Country} from './entities/country.entity';

export const countriesProviders = [
  {
    provide: countriesRepo,
    useValue: Country,
  },
];
