import { RecipesAndCountQuery } from '@sfr/data-access/generated';

export function createMockRecipeData(
  id: number = 1
): RecipesAndCountQuery['recipesAndCount']['recipes'][0] {
  return {
    __typename: 'RecipeType',
    id: id,
    name: 'sandwich',
    description: '',
    photos: [
      {
        __typename: 'RecipePhotoType',
        id: id,
        path: '/recipe-photo/1',
      },
    ],
  };
}

export function createMockRecipesAndCountData(
  numberOfRecipes: number,
  totalCount?: number
): RecipesAndCountQuery['recipesAndCount'] {
  let mockData: RecipesAndCountQuery['recipesAndCount'] = {
    totalCount: totalCount ? totalCount : numberOfRecipes,
    recipes: [],
  };

  for (let i = 0; i < numberOfRecipes; i++) {
    mockData.recipes.push(createMockRecipeData(i + 1));
  }

  return mockData;
}
