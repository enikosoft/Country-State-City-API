import {Country} from './entities/country.entity';

export interface CountryShort extends Pick<Country, 'id' | 'name' | 'iso3' | 'native' | 'phoneCode' | 'postalCodeFormat' | 'postalCodeRegex'> {}
