import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FestivalPage } from './festival.page';

describe('FestivalPage', () => {
  let component: FestivalPage;
  let fixture: ComponentFixture<FestivalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
