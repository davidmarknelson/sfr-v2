import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type AccessTokenType = {
  __typename?: 'AccessTokenType';
  accessToken: Scalars['String'];
};

export type MessageType = {
  __typename?: 'MessageType';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRecipe: RecipeType;
  deleteRecipe: MessageType;
  editRecipe: RecipeType;
  signup: AccessTokenType;
};


export type MutationCreateRecipeArgs = {
  recipe: RecipeInput;
};


export type MutationDeleteRecipeArgs = {
  id: Scalars['Float'];
};


export type MutationEditRecipeArgs = {
  recipe: RecipeEditInput;
};


export type MutationSignupArgs = {
  user: UserInput;
};

export type Query = {
  __typename?: 'Query';
  login: AccessTokenType;
  recipe: RecipeType;
  recipesAndCount: RecipesAndCountType;
  refreshToken: AccessTokenType;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryRecipeArgs = {
  name: Scalars['String'];
};


export type QueryRecipesAndCountArgs = {
  skip: Scalars['Float'];
  take: Scalars['Float'];
};

export type RecipeEditInput = {
  /** Number of minutes it takes to cook the meal */
  cookTime: Scalars['Int'];
  description: Scalars['String'];
  difficulty: Scalars['Int'];
  id: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  photos?: InputMaybe<Array<RecipePhotoInput>>;
};

export type RecipeInput = {
  /** Number of minutes it takes to cook the meal */
  cookTime: Scalars['Int'];
  description: Scalars['String'];
  difficulty: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  photos?: InputMaybe<Array<RecipePhotoInput>>;
};

export type RecipePhotoInput = {
  cloudinaryPublicId: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
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
  /** Number of minutes it takes to cook the meal */
  cookTime: Scalars['Int'];
  creator: RecipeUserType;
  description: Scalars['String'];
  /** Must be between 1 (easy) - 5 (difficulty) */
  difficulty: Scalars['Int'];
  id: Scalars['Int'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  photos: Array<RecipePhotoType>;
};

export type RecipeUserType = {
  __typename?: 'RecipeUserType';
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type RecipesAndCountType = {
  __typename?: 'RecipesAndCountType';
  recipes: Array<RecipeType>;
  totalCount: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  /** Must contain a letter, a number, a special character, and be at least 12 characters long */
  password: Scalars['String'];
  /** Must be between 5 and 25 characters long and not contain a space */
  username: Scalars['String'];
};

export type RecipesAndCountQueryVariables = Exact<{
  skip: Scalars['Float'];
  take: Scalars['Float'];
}>;


export type RecipesAndCountQuery = { __typename?: 'Query', recipesAndCount: { __typename?: 'RecipesAndCountType', totalCount: number, recipes: Array<{ __typename?: 'RecipeType', id: number, name: string, description: string, difficulty: number, cookTime: number, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string }> }> } };

export type RecipeQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe: { __typename?: 'RecipeType', cookTime: number, description: string, difficulty: number, id: number, ingredients: Array<string>, instructions: Array<string>, name: string, creator: { __typename?: 'RecipeUserType', id: number, username: string }, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string, cloudinaryPublicId: string }> } };

export type RefreshTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken: { __typename?: 'AccessTokenType', accessToken: string } };

export type LoginQueryVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'AccessTokenType', accessToken: string } };

export type SignupMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AccessTokenType', accessToken: string } };

export type CreateRecipeMutationVariables = Exact<{
  recipe: RecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'RecipeType', cookTime: number, description: string, difficulty: number, id: number, ingredients: Array<string>, instructions: Array<string>, name: string, creator: { __typename?: 'RecipeUserType', id: number, username: string }, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string, cloudinaryPublicId: string }> } };

export type EditRecipeMutationVariables = Exact<{
  recipe: RecipeEditInput;
}>;


export type EditRecipeMutation = { __typename?: 'Mutation', editRecipe: { __typename?: 'RecipeType', cookTime: number, description: string, difficulty: number, id: number, ingredients: Array<string>, instructions: Array<string>, name: string, creator: { __typename?: 'RecipeUserType', id: number, username: string }, photos: Array<{ __typename?: 'RecipePhotoType', id: number, path: string, cloudinaryPublicId: string }> } };

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
    creator {
      id
      username
    }
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
export const RefreshTokenDocument = gql`
    query refreshToken {
  refreshToken {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RefreshTokenGQL extends Apollo.Query<RefreshTokenQuery, RefreshTokenQueryVariables> {
    document = RefreshTokenDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    query login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Query<LoginQuery, LoginQueryVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SignupDocument = gql`
    mutation signup($user: UserInput!) {
  signup(user: $user) {
    accessToken
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SignupGQL extends Apollo.Mutation<SignupMutation, SignupMutationVariables> {
    document = SignupDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateRecipeDocument = gql`
    mutation createRecipe($recipe: RecipeInput!) {
  createRecipe(recipe: $recipe) {
    cookTime
    description
    difficulty
    id
    ingredients
    instructions
    name
    creator {
      id
      username
    }
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
  export class CreateRecipeGQL extends Apollo.Mutation<CreateRecipeMutation, CreateRecipeMutationVariables> {
    document = CreateRecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const EditRecipeDocument = gql`
    mutation editRecipe($recipe: RecipeEditInput!) {
  editRecipe(recipe: $recipe) {
    cookTime
    description
    difficulty
    id
    ingredients
    instructions
    name
    creator {
      id
      username
    }
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
  export class EditRecipeGQL extends Apollo.Mutation<EditRecipeMutation, EditRecipeMutationVariables> {
    document = EditRecipeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }