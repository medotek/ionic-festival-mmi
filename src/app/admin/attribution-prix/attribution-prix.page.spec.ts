import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttributionPrixPage } from './attribution-prix.page';

describe('AttributionPrixPage', () => {
  let component: AttributionPrixPage;
  let fixture: ComponentFixture<AttributionPrixPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributionPrixPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AttributionPrixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
