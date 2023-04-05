import {CountryLanguages} from '@modules/countries/entities/country-languages.entity';
import {Country} from '@modules/countries/entities/country.entity';
import {Table, Column, Model, DataType, BelongsToMany} from 'sequelize-typescript';

@Table({tableName: 'languages', timestamps: false, underscored: true})
export class Language extends Model<Language> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  iso2: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  iso3: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  nativeName: string;

  @BelongsToMany(() => Country, () => CountryLanguages)
  languages: Country[];
}
