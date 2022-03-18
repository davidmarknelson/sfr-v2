import { FormControl, FormGroup } from '@angular/forms';
import { combinedMaxLengthValidator } from './combined-max-length.validator';

describe('combinedMaxLengthValidator', () => {
  const validator = combinedMaxLengthValidator(['one', 'two', 'three'], 3);
  it('should return null if the max length is not greater than the provided number (included nullish values)', () => {
    expect(
      validator(
        new FormGroup({
          one: new FormControl(null),
          two: new FormControl(undefined),
          three: new FormControl([1, 2]),
        })
      )
    ).toEqual(null);
  });

  it('should return null if the max length is not greater than the provided number (excluding nullish values)', () => {
    expect(
      validator(
        new FormGroup({
          one: new FormControl([1]),
          two: new FormControl([]),
          three: new FormControl([1, 2]),
        })
      )
    ).toEqual(null);
  });

  it('should return an object if the max length is greater than the provided number', () => {
    expect(
      validator(
        new FormGroup({
          one: new FormControl([1]),
          two: new FormControl([1]),
          three: new FormControl([1, 2]),
        })
      )
    ).toEqual({ combinedMaxLength: true });
  });

  it('should throw an error if a provided value is not an array, null, or undefined (string)', () => {
    expect(() => {
      validator(
        new FormGroup({
          one: new FormControl('one'),
          two: new FormControl([1]),
          three: new FormControl([1, 2]),
        })
      );
    }).toThrowError(
      'Values used in the combined max length validator must be one of the following: null, undefined, array'
    );
  });

  it('should throw an error if a provided value is not an array, null, or undefined (object)', () => {
    expect(() => {
      validator(
        new FormGroup({
          one: new FormControl({ one: 1 }),
          two: new FormControl([1]),
          three: new FormControl([1, 2]),
        })
      );
    }).toThrowError(
      'Values used in the combined max length validator must be one of the following: null, undefined, array'
    );
  });

  it('should throw an error if a provided value is not an array, null, or undefined (number)', () => {
    expect(() => {
      validator(
        new FormGroup({
          one: new FormControl(1),
          two: new FormControl([1]),
          three: new FormControl([1, 2]),
        })
      );
    }).toThrowError(
      'Values used in the combined max length validator must be one of the following: null, undefined, array'
    );
  });
});
