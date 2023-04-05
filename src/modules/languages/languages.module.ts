import {Module} from '@nestjs/common';
import {LanguagesService} from './languages.service';
import {LanguagesController} from './languages.controller';
import {languagesProviders} from './languages.provider';
import {DatabaseConfigModule} from '@app/core/database/database.module';

@Module({
  imports: [DatabaseConfigModule],
  controllers: [LanguagesController],
  providers: [LanguagesService, ...languagesProviders],
  exports: [LanguagesService],
})
export class LanguagesModule {}
