import {PartialType} from '@nestjs/mapped-types';
import {CreateCountryDto} from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  readonly postalCodeFormat: string;
  readonly postalCodeRegex: string;
  readonly phoneCode: string;
  readonly domain: string;
}
