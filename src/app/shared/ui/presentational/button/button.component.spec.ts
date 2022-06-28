import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfrButtonComponent } from './button.component';

@Component({
  template: ` <button sfr-button></button> `,
})
class HostButtonComponent {}
@Component({
  template: ` <a sfr-button></a> `,
})
class HostAnchorComponent {}

describe('ButtonComponent', () => {
  let component: SfrButtonComponent;
  let fixture: ComponentFixture<SfrButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SfrButtonComponent,
        HostButtonComponent,
        HostAnchorComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfrButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
