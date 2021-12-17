import { apiUserConstants } from './user-constants';

export const apiUserMessageConstants = {
  usernameLength: `Username must be between ${apiUserConstants.usernameMinLength} and ${apiUserConstants.usernameMaxLength} characters long`,
  usernameSpace: 'Username must not contain a space',
  passwordRegex:
    'Password must contain a letter, a number, a special character, and be at least 12 characters long',
};
