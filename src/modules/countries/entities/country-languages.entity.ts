import {Language} from '@modules/languages/entities/language.entity';
import {Table, Column, Model, DataType, BelongsToMany, ForeignKey} from 'sequelize-typescript';
import {Country} from './country.entity';

@Table({tableName: 'country_languages', timestamps: false, underscored: true})
export class CountryLanguages extends Model<CountryLanguages> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Country)
  @Column({type: DataType.STRING})
  countryId: number;

  @ForeignKey(() => Language)
  @Column({type: DataType.STRING})
  languageId: number;
}
