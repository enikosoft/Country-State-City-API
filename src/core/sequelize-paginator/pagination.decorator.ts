import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {loadPackage} from '@nestjs/common/utils/load-package.util';

import {PaginationQuery} from './pagination.entity';

export const Pagination = createParamDecorator(
  (data: PaginationQuery | undefined, ctx: ExecutionContext): PaginationQuery => {
    const request = ctx.switchToHttp().getRequest();

    return {
      offset: request.query.offset ? parseInt(request.query.offset) : data?.offset || null,
      limit: request.query.limit ? parseInt(request.query.limit) : data?.limit || null,
      page: request.query.page ? parseInt(request.query.page) : data?.page || null,
      sortBy: request.query.sortBy ? request.query.sortBy : data?.sortBy || null,
      sortOrder: request.query.sortOrder ? request.query.sortOrder : data?.sortOrder || null,
      str: request.query.str ? request.query.str : data?.str || null,
    };
  },
  [
    (target: any, key: string) => {
      const Swagger = loadPackage('@nestjs/swagger', 'PaginationDecorator', () => require('@nestjs/swagger'));

      if (Swagger) {
        Swagger.ApiQuery({
          name: 'limit',
          schema: {
            type: 'number',
            description: 'The limit, numbers of rows returnded',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'page',
          schema: {
            type: 'number',
            description: 'The page to start pagination',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'offset',
          schema: {
            type: 'number',
            description: 'The offset to start pagination (will be ignored if page was specified)',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'sortBy',
          schema: {
            type: 'string',
            description: 'Column name for sorting',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'sortOrder',
          schema: {
            type: '[asc, desc]',
            description: 'The sort order - asc or desc',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'str',
          schema: {
            type: 'string',
            description: 'Search string',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
      }
    },
  ],
);
