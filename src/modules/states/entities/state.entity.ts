import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';

import {ApiProperty} from '@nestjs/swagger';
import {Country} from '@modules/countries/entities/country.entity';
import {City} from '@modules/cities/entities/city.entity';

@Table({tableName: 'states', timestamps: false, underscored: true})
export class State extends Model<State> {
  @ApiProperty({example: '8', description: 'State id'})
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Dire Dawa', description: 'State name'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({example: 'ET', description: 'Country iso format code'})
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
  fipsCode: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  iso2: string;

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

  @BelongsTo(() => Country)
  country: Country;

  @HasMany(() => City)
  cities: State[];
}
