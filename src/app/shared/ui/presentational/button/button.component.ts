/* eslint-disable @angular-eslint/no-inputs-metadata-property */
/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @angular-eslint/component-selector */
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

type SfrColor = 'primary' | 'accent' | 'warn' | null;

@UntilDestroy()
@Component({
  selector:
    'button[sfr-button], a[sfr-button], button[sfr-flat-button], a[sfr-flat-button], button[sfr-icon-button], a[sfr-icon-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[attr.disabled]': 'disabled || null',
    '[class.sfr-button--disabled]': 'disabled',
    class: 'sfr-button',
    '[attr.tabindex]': 'disabled ? -1 : tabIndex',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfrButtonComponent implements OnInit, OnDestroy {
  @Input() disabled?: boolean;
  @Input() tabIndex?: number;
  @Input() get color(): SfrColor {
    return this._color;
  }
  set color(color: SfrColor) {
    this.renderer.addClass(this._elementRef.nativeElement, `sfr-${color}`);
    this._color = color;
  }
  private _color: SfrColor = null;

  constructor(
    private readonly _elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly _focusMonitor: FocusMonitor
  ) {
    this._focusMonitor
      .monitor(this._getHostElement())
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  ngOnInit(): void {
    this._elementRef.nativeElement.addEventListener(
      'click',
      this._haltDisabledEvents
    );
  }

  ngOnDestroy(): void {
    this._elementRef.nativeElement.removeEventListener(
      'click',
      this._haltDisabledEvents
    );
  }

  _getHostElement() {
    return this._elementRef.nativeElement;
  }

  _haltDisabledEvents = (event: Event): void => {
    // A disabled button shouldn't apply any actions
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
}
