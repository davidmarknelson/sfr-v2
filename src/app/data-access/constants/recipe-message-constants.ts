import { apiRecipeConstants } from './recipe-constants';

export const apiRecipeMessageConstants = {
  nameMaxLength: `Must not be longer than ${apiRecipeConstants.nameMaxLength} characters`,
  nameMaxLengthError: `Name must not be longer than ${apiRecipeConstants.nameMaxLength} characters`,
  descriptionMaxLength: `Must not be longer than ${apiRecipeConstants.descriptionMaxLength} characters`,
  descriptionMaxLengthError: `Description must not be longer than ${apiRecipeConstants.descriptionMaxLength} characters`,
};
