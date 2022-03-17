import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SfrAppComponent } from './app.component';
import { SfrTitleService } from './shared/utils/services';

describe('SfrAppComponent', () => {
  let titleService: SfrTitleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SfrAppComponent],
    }).compileComponents();
    titleService = TestBed.inject(SfrTitleService);
  });

  it('should create the app and initialize the tab titles service', () => {
    const titleSpy = jest.spyOn(titleService, 'setTabTitles');
    const fixture = TestBed.createComponent(SfrAppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeDefined();
    expect(titleSpy).toHaveBeenCalled();
  });
});
