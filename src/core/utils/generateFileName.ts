import * as convert from 'cyrillic-to-latin';

export class GenerateJsonDto {
  readonly countries?: boolean;
  readonly states?: boolean;
  readonly cities?: boolean;
}

export const generateFileName = ({countries, states, cities}) => {
  if (countries) {
    if (!states && cities) {
      return convert('Countries+Cities');
    } else if (states && !cities) {
      return convert('Countries+States');
    }
    return convert('Countries+States+Cities');
  } else if (states) {
    if (cities) {
      return convert('States+Cities');
    }
    return convert('States');
  } else {
    return convert('Cities');
  }
};
