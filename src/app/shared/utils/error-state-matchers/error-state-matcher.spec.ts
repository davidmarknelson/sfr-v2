import { FormControl, FormGroupDirective } from '@angular/forms';
import { SfrErrorStateMatcher } from './error-state-matcher';

describe('SfrErrorStateMatcher', () => {
  let errorMatcher: SfrErrorStateMatcher;
  let control: FormControl;
  let form: FormGroupDirective;

  beforeEach(() => {
    errorMatcher = new SfrErrorStateMatcher(['passwordMatch']);
    form = new FormGroupDirective([], []);
    control = new FormControl('');
  });

  it('should return true if the form has a matching error and the control is dirty', () => {
    const formSpy = jest.spyOn(form, 'hasError').mockReturnValue(true);
    const controlSpy = jest
      .spyOn(control, 'dirty', 'get')
      .mockReturnValue(true);
    expect(errorMatcher.isErrorState(control, form)).toEqual(true);
    expect(formSpy).toHaveBeenCalled();
    expect(controlSpy).toHaveBeenCalled();
  });

  it('should return false if the form does not have a matching error and the control is dirty', () => {
    const formSpy = jest.spyOn(form, 'hasError').mockReturnValue(false);
    const controlSpy = jest
      .spyOn(control, 'dirty', 'get')
      .mockReturnValue(true);
    expect(errorMatcher.isErrorState(control, form)).toEqual(false);
    expect(formSpy).toHaveBeenCalled();
    expect(controlSpy).toHaveBeenCalled();
  });
});
