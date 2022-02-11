import { RecipeInput, RecipeQuery } from '@sfr/data-access/generated';

export interface CreateEditRecipe extends Omit<RecipeInput, 'photos'> {
  currentPhotos: RecipeQuery['recipe']['photos'];
  imageFiles: File[];
}
