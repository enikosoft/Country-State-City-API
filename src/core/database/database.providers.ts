import {City} from '@modules/cities/entities/city.entity';
import {CountryLanguages} from '@modules/countries/entities/country-languages.entity';
import {Country} from '@modules/countries/entities/country.entity';
import {Language} from '@modules/languages/entities/language.entity';
import {State} from '@modules/states/entities/state.entity';
import {Sequelize} from 'sequelize-typescript';
import {databaseConfig} from './configuration';
import {DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST} from './constants';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Country, State, City, Language, CountryLanguages]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
