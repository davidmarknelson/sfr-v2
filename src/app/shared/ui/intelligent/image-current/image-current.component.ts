import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RecipeQuery } from '@sfr/data-access/generated';

@Component({
  selector: 'sfr-image-current',
  templateUrl: './image-current.component.html',
  styleUrls: ['./image-current.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SfrImageCurrentComponent),
      multi: true,
    },
  ],
})
export class SfrImageCurrentComponent {
  private _value: RecipeQuery['recipe']['photos'] = [];
  onChange(_: RecipeQuery['recipe']['photos']) {}
  onTouched() {}

  get value(): RecipeQuery['recipe']['photos'] {
    return this._value;
  }
  set value(files: RecipeQuery['recipe']['photos']) {
    this._value = files;
    this.onChange(files);
    this.onTouched();
  }

  removeFile(index: number): void {
    this.writeValue(this.value.filter((_file, i) => i !== index));
  }

  writeValue(files: RecipeQuery['recipe']['photos']): void {
    if (files) {
      this.value = files;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
