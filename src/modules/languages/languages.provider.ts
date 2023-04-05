import {languagesRepo} from '@app/core/constants/repo-tockens';
import {Language} from './entities/language.entity';

export const languagesProviders = [
  {
    provide: languagesRepo,
    useValue: Language,
  },
];
