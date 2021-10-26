import { CyHttpMessages } from 'cypress/types/net-stubbing';

// Utility to match GraphQL mutation based on the operation name
const hasOperationName = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
): boolean => {
  const { body } = req;
  return (
    body.hasOwnProperty('operationName') && body.operationName === operationName
  );
};

const hasNoVariablesOrMatching = (
  req: CyHttpMessages.IncomingHttpRequest,
  variables: object
): boolean => {
  const { body } = req;
  return (
    !variables ||
    (body.hasOwnProperty('variables') &&
      Object.keys(body.variables).every(
        (key) => body.variables[key] === variables[key]
      ))
  );
};

// Alias query if operationName matches
export const aliasQuery = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string,
  variables?: object
): void => {
  if (
    hasOperationName(req, operationName) &&
    hasNoVariablesOrMatching(req, variables)
  ) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (
  req: CyHttpMessages.IncomingHttpRequest,
  operationName: string
): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
