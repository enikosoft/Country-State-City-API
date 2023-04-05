import {CountriesService} from '@modules/countries/countries.service';
import {Body, Controller, HttpCode, HttpStatus, Post, Res} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {generateFileName, GenerateJsonDto} from './core/utils/generateFileName';
import {StatesService} from '@modules/states/states.service';
import {CitiesService} from '@modules/cities/cities.service';

@Controller('/')
export class AppController {
  constructor(
    private readonly countriesService: CountriesService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
    private configService: ConfigService,
  ) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }

  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }

  @ApiTags('data')
  @ApiOperation({summary: 'Generate JSON with country-state-city data.'})
  @ApiResponse({status: HttpStatus.CREATED})
  @HttpCode(201)
  @Post('/json')
  async generateJson(@Body() generateJsonDto: GenerateJsonDto, @Res() res) {
    const {countries, states, cities} = generateJsonDto;
    const fileName = generateFileName({countries, states, cities});

    let data = [];

    if (countries) {
      data = await this.countriesService.generateJson(generateJsonDto);
    } else if (!countries && states) {
      data = await this.statesService.generateJson(generateJsonDto);
    } else if (!countries && !states && cities) {
      data = await this.citiesService.generateJson(generateJsonDto);
    }

    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Expose-Headers': 'Content-Disposition',
      'Content-Disposition': `attachment; filename=${fileName}.json`,
    });

    res.status(200).json(data);

    //fs.writeFileSync(`${fileName}.json`, JSON.stringify(data));
  }
}
