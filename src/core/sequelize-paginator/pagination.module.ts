import {Global, Module} from '@nestjs/common';
import {PaginationQuery} from './pagination.entity';
import {PaginationService} from './pagination.service';
import {LIMIT, OFFSET, PAGINATION_OPTIONS} from './pagination.constants';

@Global()
@Module({
  exports: [PaginationService],
  providers: [PaginationService],
})
export class PaginationModule {
  static forRoot(options: PaginationQuery = {limit: LIMIT, offset: OFFSET}) {
    return {
      module: PaginationModule,
      providers: [
        {
          provide: PAGINATION_OPTIONS,
          useValue: options,
        },
        PaginationService,
      ],
      exports: [PaginationService],
    };
  }
}
