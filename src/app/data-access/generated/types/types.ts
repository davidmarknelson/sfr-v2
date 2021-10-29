import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
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
  id: Scalars['Float'];
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


export type RecipesAndCountQuery = { __typename?: 'Query', recipesAndCount: { __typename?: 'RecipesAndCountType', totalCount: number, recipes: Array<{ __typename?: 'RecipeType', id: number, name: string, description: string, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string }> }> } };

export const RecipesAndCountDocument = gql`
    query recipesAndCount($skip: Float!, $take: Float!) {
  recipesAndCount(skip: $skip, take: $take) {
    recipes {
      id
      name
      description
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
export type MessageTypeKeySpecifier = ('message' | MessageTypeKeySpecifier)[];
export type MessageTypeFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createRecipe' | 'deleteRecipe' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createRecipe?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRecipe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('recipe' | 'recipesAndCount' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	recipe?: FieldPolicy<any> | FieldReadFunction<any>,
	recipesAndCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecipePhotoTypeKeySpecifier = ('cloudinaryPublicId' | 'id' | 'path' | RecipePhotoTypeKeySpecifier)[];
export type RecipePhotoTypeFieldPolicy = {
	cloudinaryPublicId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	path?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecipeTypeKeySpecifier = ('cookTime' | 'description' | 'difficulty' | 'id' | 'ingredients' | 'instructions' | 'name' | 'photos' | RecipeTypeKeySpecifier)[];
export type RecipeTypeFieldPolicy = {
	cookTime?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	difficulty?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ingredients?: FieldPolicy<any> | FieldReadFunction<any>,
	instructions?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	photos?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecipesAndCountTypeKeySpecifier = ('recipes' | 'totalCount' | RecipesAndCountTypeKeySpecifier)[];
export type RecipesAndCountTypeFieldPolicy = {
	recipes?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	MessageType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageTypeKeySpecifier | (() => undefined | MessageTypeKeySpecifier),
		fields?: MessageTypeFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RecipePhotoType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecipePhotoTypeKeySpecifier | (() => undefined | RecipePhotoTypeKeySpecifier),
		fields?: RecipePhotoTypeFieldPolicy,
	},
	RecipeType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecipeTypeKeySpecifier | (() => undefined | RecipeTypeKeySpecifier),
		fields?: RecipeTypeFieldPolicy,
	},
	RecipesAndCountType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecipesAndCountTypeKeySpecifier | (() => undefined | RecipesAndCountTypeKeySpecifier),
		fields?: RecipesAndCountTypeFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;