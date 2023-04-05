import {Controller} from '@nestjs/common';
import {LanguagesService} from './languages.service';
import {CreateLanguageDto} from './dto/create-language.dto';
import {UpdateLanguageDto} from './dto/update-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}
}
