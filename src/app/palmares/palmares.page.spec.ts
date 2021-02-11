import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PalmaresPage } from './palmares.page';

describe('PalmaresPage', () => {
  let component: PalmaresPage;
  let fixture: ComponentFixture<PalmaresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalmaresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PalmaresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
