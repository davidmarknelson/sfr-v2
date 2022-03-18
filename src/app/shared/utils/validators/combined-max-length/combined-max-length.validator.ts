import { AbstractControl, ValidatorFn } from '@angular/forms';

export function combinedMaxLengthValidator(
  fields: string[],
  maxLength: number
): ValidatorFn {
  return (group: AbstractControl) => {
    if (
      fields.some(
        (field) =>
          group.get(field)?.value !== null &&
          group.get(field)?.value !== undefined &&
          !Array.isArray(group.get(field)?.value)
      )
    ) {
      throw new Error(
        'Values used in the combined max length validator must be one of the following: null, undefined, array'
      );
    }

    return fields.reduce(
      (previous, current) => previous + group.get(current)?.value?.length || 0,
      0
    ) > maxLength
      ? { combinedMaxLength: true }
      : null;
  };
}
