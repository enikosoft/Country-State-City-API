import {State} from './entities/state.entity';

export interface StateList extends Pick<State, 'id' | 'name' | 'iso2'> {}
