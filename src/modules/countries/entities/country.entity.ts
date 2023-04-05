import {Table, Column, Model, DataType, BelongsToMany, HasMany} from 'sequelize-typescript';

import {ApiProperty} from '@nestjs/swagger';
import {State} from '@modules/states/entities/state.entity';
import {Language} from '@modules/languages/entities/language.entity';
import {CountryLanguages} from './country-languages.entity';
import {City} from '@modules/cities/entities/city.entity';

@Table({tableName: 'countries', timestamps: false, underscored: true})
export class Country extends Model<Country> {
  @ApiProperty({example: '1', description: 'Country id'})
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Ukraine', description: 'Country name'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({example: 'UA', description: 'Country iso format code'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  iso3: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  numericCode: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  iso2: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  capital: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currencyName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currencySymbol: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  tld: string;

  @ApiProperty({example: 'Україна', description: 'Native name of the country'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  native: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subregion: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  timezones: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  translations: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  latitude: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  longitude: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emoji: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  emojiu: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  wikidataid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCodeFormat: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  postalCodeRegex: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  domain: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  population: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  area: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  neighborCountryIso: string;

  @BelongsToMany(() => Language, () => CountryLanguages)
  languages: Language[];

  @HasMany(() => State)
  states: State[];

  @HasMany(() => City)
  cities: State[];
}
