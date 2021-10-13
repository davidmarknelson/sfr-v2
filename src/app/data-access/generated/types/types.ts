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

export type Query = {
  __typename?: 'Query';
  recipe: RecipeType;
  recipes: Array<RecipeType>;
};


export type QueryRecipeArgs = {
  id: Scalars['Int'];
};

export type RecipePhotoType = {
  __typename?: 'RecipePhotoType';
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
  photo: RecipePhotoType;
};

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'RecipeType', id: number, name: string, photo: { __typename?: 'RecipePhotoType', id: number, path: string } }> };

export const RecipesDocument = gql`
    query recipes {
  recipes {
    id
    name
    photo {
      id
      path
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RecipesGQL extends Apollo.Query<RecipesQuery, RecipesQueryVariables> {
    document = RecipesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }