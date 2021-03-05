import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OeuvrePage } from './oeuvre.page';

describe('OeuvrePage', () => {
  let component: OeuvrePage;
  let fixture: ComponentFixture<OeuvrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OeuvrePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OeuvrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
