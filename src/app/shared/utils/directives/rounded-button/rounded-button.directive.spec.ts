import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SfrRoundedButtonDirective } from './rounded-button.directive';

@Component({
  template: ` <button sfrRoundedButton></button> `,
})
class HostComponent {}

describe('RoundedButtonDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let button: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SfrRoundedButtonDirective, HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button')).nativeElement;
  });

  it('should apply the rounded button class', () => {
    expect(button.classList).toContain('sfr-rounded-button');
  });
});
