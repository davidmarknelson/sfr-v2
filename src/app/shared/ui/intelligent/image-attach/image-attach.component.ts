import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sfr-image-attach',
  templateUrl: './image-attach.component.html',
  styleUrls: ['./image-attach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SfrImageAttachComponent),
      multi: true,
    },
  ],
})
export class SfrImageAttachComponent {
  private _value: File[] = [];
  onChange(_: File[]) {}
  onTouched() {}

  get value(): File[] {
    return this._value;
  }
  set value(files: File[]) {
    this._value = files;
    this.onChange(files);
    this.onTouched();
  }

  attachFile(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      let filesToAdd: File[] = [];
      for (let i = 0; i < files.length; i++) {
        filesToAdd.push(files.item(i)!);
      }
      this.writeValue([...this.value, ...filesToAdd]);
    }
  }

  removeFile(index: number): void {
    this.writeValue(this.value.filter((_file, i) => i !== index));
  }

  writeValue(files: File[]): void {
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
