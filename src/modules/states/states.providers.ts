import {statesRepo} from '@app/core/constants/repo-tockens';
import {State} from './entities/state.entity';

export const statesProviders = [
  {
    provide: statesRepo,
    useValue: State,
  },
];
