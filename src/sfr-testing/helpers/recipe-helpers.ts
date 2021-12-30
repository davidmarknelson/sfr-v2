import {
  RecipeInput,
  RecipeQuery,
  RecipesAndCountQuery,
} from '@sfr/data-access/generated';

export function createMockRecipeInput(): RecipeInput {
  return {
    name: 'sandwich',
    description: 'some description',
    cookTime: 20,
    difficulty: 1,
    instructions: ['make sandwich'],
    ingredients: ['meat and bread'],
    photos: [],
  };
}

export function createMockRecipeFullData(
  id: number = 1
): RecipeQuery['recipe'] {
  return {
    __typename: 'RecipeType',
    id: id,
    name: 'sandwich',
    description: 'some description',
    cookTime: 20,
    difficulty: 1,
    instructions: ['make sandwich'],
    ingredients: ['meat and bread'],
    creator: {
      id: 1,
      username: 'some-user',
    },
    photos: [
      {
        __typename: 'RecipePhotoType',
        id: id,
        path: '/recipe-photo/1',
        cloudinaryPublicId: 'someCloudinaryPublicId',
      },
    ],
  };
}

export function createMockRecipeData(
  id: number = 1
): RecipesAndCountQuery['recipesAndCount']['recipes'][0] {
  return {
    __typename: 'RecipeType',
    id: id,
    name: 'sandwich',
    description: '',
    cookTime: 20,
    difficulty: 1,
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
