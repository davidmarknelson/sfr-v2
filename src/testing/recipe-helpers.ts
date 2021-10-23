import { RecipesAndCountQuery } from '@sfr/data-access/generated';

export function createMockData(
  numberOfRecipes: number,
  totalCount?: number
): RecipesAndCountQuery['recipesAndCount'] {
  let mockData: RecipesAndCountQuery['recipesAndCount'] = {
    totalCount: totalCount ? totalCount : numberOfRecipes,
    recipes: [],
  };

  for (let i = 0; i < numberOfRecipes; i++) {
    mockData.recipes.push({
      __typename: 'RecipeType',
      id: i + 1,
      name: 'sandwich',
      description: '',
      photo: {
        id: i + 1,
        path: '/recipe-photo/1',
      },
    });
  }

  return mockData;
}
