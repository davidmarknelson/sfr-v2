import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MessageType = {
  __typename?: 'MessageType';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe: RecipeType;
  deleteRecipe: MessageType;
};


export type MutationCreateRecipeArgs = {
  recipe: RecipeInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  recipe: RecipeType;
  recipesAndCount: RecipesAndCountType;
};


export type QueryRecipeArgs = {
  name: Scalars['String'];
};


export type QueryRecipesAndCountArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};

export type RecipeInput = {
  cookTime: Scalars['Int'];
  description: Scalars['String'];
  difficulty: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  photos?: Maybe<Array<RecipePhotoInput>>;
};

export type RecipePhotoInput = {
  cloudinaryPublicId: Scalars['String'];
  path: Scalars['String'];
};

export type RecipePhotoType = {
  __typename?: 'RecipePhotoType';
  cloudinaryPublicId: Scalars['String'];
  id: Scalars['Int'];
  path: Scalars['String'];
};

export type RecipeType = {
  __typename?: 'RecipeType';
  cookTime: Scalars['Int'];
  description: Scalars['String'];
  difficulty: Scalars['Int'];
  id: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  photos: Array<RecipePhotoType>;
};

export type RecipesAndCountType = {
  __typename?: 'RecipesAndCountType';
  recipes: Array<RecipeType>;
  totalCount: Scalars['Int'];
};

export type RecipesAndCountQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type RecipesAndCountQuery = { __typename?: 'Query', recipesAndCount: { __typename?: 'RecipesAndCountType', totalCount: number, recipes: Array<{ __typename?: 'RecipeType', id: number, name: string, description: string, difficulty: number, cookTime: number, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string }> }> } };

export type RecipeQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe: { __typename?: 'RecipeType', cookTime: number, description: string, difficulty: number, id: number, ingredients: Array<string>, instructions: Array<string>, name: string, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string, cloudinaryPublicId: string }> } };

export const RecipesAndCountDocument = gql`
    query recipesAndCount($skip: Float!, $take: Float!) {
  recipesAndCount(skip: $skip, take: $take) {
    recipes {
      id
      name
      description
      difficulty
      cookTime
      photos {
        id
        path
      }
    }
    totalCount
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipesAndCountGQL extends Apollo.Query<RecipesAndCountQuery, RecipesAndCountQueryVariables> {
    document = RecipesAndCountDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RecipeDocument = gql`
    query recipe($name: String!) {
  recipe(name: $name) {
    cookTime
    description
    difficulty
    id
    ingredients
    instructions
    name
    photos {
      id
      path
      cloudinaryPublicId
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipeGQL extends Apollo.Query<RecipeQuery, RecipeQueryVariables> {
    document = RecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }