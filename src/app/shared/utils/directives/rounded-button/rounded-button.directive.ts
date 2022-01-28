import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[sfrRoundedButton]',
})
export class SfrRoundedButtonDirective {
  @HostBinding('class.sfr-rounded-corners') readonly elementClass = true;
}
