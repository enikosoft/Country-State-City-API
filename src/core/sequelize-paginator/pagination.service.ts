import {Inject, Injectable} from '@nestjs/common';
import {ModuleRef} from '@nestjs/core';
import {Op, Sequelize} from 'sequelize';
import {Model, ModelCtor} from 'sequelize-typescript';
import {FindAndCountOptions} from 'sequelize/types';
import {PAGINATION_OPTIONS} from './pagination.constants';

import {PaginationOption, PaginationQuery, PaginationResponse} from './pagination.entity';

@Injectable()
export class PaginationService {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(PAGINATION_OPTIONS)
    private defaultOptions: PaginationQuery,
  ) {}

  async findAll(
    options: PaginationOption,
    optionsSequelize: FindAndCountOptions,
    providerToken: string,
    isCountry?: boolean,
    isCity?: boolean,
  ): Promise<PaginationResponse<any>> {
    const repository: ModelCtor<Model<any, any>> = this.moduleRef.get(providerToken, {
      strict: false,
    });

    options.limit = options.limit || this.defaultOptions.limit;
    options.str = options.str ? options.str.toLowerCase() : '';

    // if query has a page attr -> offset will be ignored
    let offset;

    if (options?.page !== null) {
      if (options?.page === 0) offset = 0;
      else offset = options.page * options.limit;
    } else offset = options.offset;

    options.offset = offset || this.defaultOptions.offset;

    console.log('options', options);
    console.log('optionsSequelize', optionsSequelize);

    const nameField = `${isCity ? 'City' : 'Country'}.name`;

    const response = await repository.findAndCountAll({
      ...options,
      ...optionsSequelize,
      ...(options.str.length
        ? {
            where: {
              [Op.or]: [
                Sequelize.where(Sequelize.fn('lower', Sequelize.col(nameField)), {
                  [Op.like]: `%${options.str}%`,
                }),

                isCountry &&
                  Sequelize.where(Sequelize.fn('lower', Sequelize.col('iso3')), {
                    [Op.like]: `%${options.str}%`,
                  }),
                isCountry &&
                  Sequelize.where(Sequelize.fn('lower', Sequelize.col('native')), {
                    [Op.like]: `%${options.str}%`,
                  }),
              ],
            },
          }
        : {}),
      //...optionsSequelize,
    });

    const pages = Math.ceil(response.count / options.limit) - 1;
    const page = options.page || Math.floor(options.offset / options.limit) || 0;

    return {
      items: response.rows,
      total: response.count,
      limit: options.limit,
      offset: options.offset,
      page,
      pages,
      str: options.str || '',
      hasNextPage: !(page > pages) && page !== pages,
      hasPrevPage: page !== 0 && page - 1 <= pages,
    };
  }
}
