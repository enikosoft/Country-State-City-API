import {Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';

import {ApiProperty} from '@nestjs/swagger';
import {Country} from '@modules/countries/entities/country.entity';
import {State} from '@modules/states/entities/state.entity';

@Table({tableName: 'cities', timestamps: false, underscored: true})
export class City extends Model<City> {
  @ApiProperty({example: '3', description: 'City id'})
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Canillo', description: 'City name'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  name: string;

  @ApiProperty({example: 'AD', description: 'Country iso format code'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  countryCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  stateCode: string;

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
  wikidataid: string;

  @ForeignKey(() => Country)
  @Column
  countryId: number;

  @ForeignKey(() => State)
  @Column
  stateId: number;

  @BelongsTo(() => Country)
  country: Country;

  @BelongsTo(() => State)
  state: State;
}
