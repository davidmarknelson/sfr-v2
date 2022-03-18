import { combinedMaxLengthValidator } from './combined-max-length/combined-max-length.validator';
import { passwordMatchValidator } from './password-match/password-match.validator';

export class SfrValidators {
  static passwordMatch = passwordMatchValidator;
  static combinedMaxLength = combinedMaxLengthValidator;
}
