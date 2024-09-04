import { ValidationError } from 'class-validator';
import { ValidationException } from './validation-exception';

const generateErrorCode = (actualCode) => {
  switch (actualCode) {
    case 'isNotEmpty':
      return 'required';
    case 'whitelistValidation':
      return 'invalid_key';
    default:
      return 'validation_failed';
  }
};

const fetchActualErrorMsg = (errors, error: ValidationError) => {
  if (error.constraints) {
    errors.push(
      Object.entries(error.constraints).map((er) => {
        const obj = {
          error_code: generateErrorCode(er[0]),
          error_message: er[1],
        };
        return obj;
      }),
    );
    return errors;
  } else {
    for (let index = 0; index < error.children.length; index++) {
      const child = error.children[index];
      return fetchActualErrorMsg(errors, child);
    }
  }
};

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const errMsg = {};

  for (let index = 0; index < errors.length; index++) {
    const error = errors[index];
    let errs = [];
    errs = fetchActualErrorMsg(errs, error);
    errMsg[error.property] = errs.flat();
  }

  return new ValidationException(errMsg);
};
