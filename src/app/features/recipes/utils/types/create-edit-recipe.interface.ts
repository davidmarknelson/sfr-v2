import { RecipeInput } from '@sfr/data-access/generated';

export interface CreateEditRecipe extends RecipeInput {
  photosToRemove: string[];
  imageFiles: File[];
}
