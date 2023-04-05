import {plainToClass} from 'class-transformer';
import {IsString, validateSync, ValidationError} from 'class-validator';

class EnvironmentVariables {
  @IsString()
  MONGO_USER: string;

  @IsString()
  MONGO_PASSWORD: string;

  @IsString()
  MONGO_URL: string;

  @IsString()
  MONGO_PORT: string;

  @IsString()
  MONGO_OPTIONS: string;

  @IsString()
  MONGO_DB_USERS: string;

  @IsString()
  MONGO_DB_MENUDASHBOARD: string;

  @IsString()
  MONGO_DB_RESTAURANTSMENUS: string;

  @IsString()
  MONGO_DB_CONFIGURATIONDB: string;
}

// export function validate(config: Record<string, unknown>) {
//   const validatedConfig = plainToClass(EnvironmentVariables, config, {
//     enableImplicitConversion: true,
//     exposeDefaultValues: true,
//   });
//   const errors = validateSync(validatedConfig, {
//     skipMissingProperties: false,
//   });

//   if (errors.length > 0) {
//     const errorsOutput = errors
//       .map((error: ValidationError) => error.constraints.isString)
//       .toString();
//     throw new Error(errorsOutput);
//   }
//   return validatedConfig;
// }
