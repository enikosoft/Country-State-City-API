import {PaginationQuery} from '@app/core/sequelize-paginator/pagination.entity';
import {ApiProperty} from '@nestjs/swagger';
import {State} from './state.entity';

export default class PaginationSwaggerResponse extends PaginationQuery {
  @ApiProperty({description: 'Array of states', type: [State]})
  items: State;

  @ApiProperty({description: 'Total items', example: '150'})
  total: number;

  @ApiProperty({description: 'Current page', example: '0'})
  page: number;

  @ApiProperty({required: false, description: 'Offset items (will be ignored if specified page', example: '10'})
  offset: number;

  @ApiProperty({description: 'Total pages', example: '25'})
  pages: number;

  @ApiProperty({description: 'Items on the page', example: '1'})
  limit: number;

  @ApiProperty({description: 'Has next page', example: 'true'})
  hasNextPage: boolean;

  @ApiProperty({description: 'Has previous page', example: 'false'})
  hasPrevPage: boolean;

  @ApiProperty({description: 'Search string by name/iso3/native', example: 'braz'})
  str: string;
}
