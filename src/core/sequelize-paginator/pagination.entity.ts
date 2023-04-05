import {IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';
import {Model, ModelCtor} from 'sequelize-typescript';

export enum SortOrderOptions {
  Asc = 'asc',
  Desc = 'desc',
}

export class PaginationQuery {
  @IsOptional()
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  sortBy?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: SortOrderOptions;

  @IsOptional()
  @IsString()
  str?: string;
}

export interface PaginationOption extends PaginationQuery {
  model: ModelCtor<Model<any, any>>;
}

export interface PaginationResponse<T> extends PaginationQuery {
  items: T[];
  total: number;
  offset: number;
  pages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  str?: string;
}
